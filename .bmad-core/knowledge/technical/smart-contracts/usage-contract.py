"""
Play and Pay - Usage Contract (PyTeal)
Smart Contract for Pay-as-you-Use micro-payments

This contract handles:
- Per-minute/second billing
- Fee distribution (Platform + Provider)
- Idempotency checks
- Rate validation

Deployment:
    python usage-contract.py
    goal app create --creator CREATOR_ADDR --approval-prog usage_contract_approval.teal --clear-prog usage_contract_clear.teal
"""

from pyteal import *

# Global State Keys
PROVIDER_ADDR = Bytes("provider")
PLATFORM_ADDR = Bytes("platform")
PLATFORM_FEE_PCT = Bytes("fee_pct")  # Fee percentage (basis points, e.g., 500 = 5%)
MIN_RATE = Bytes("min_rate")  # Minimum rate per minute (in PLY minor units)
MAX_RATE = Bytes("max_rate")  # Maximum rate per minute (in PLY minor units)

# Local State Keys (per user)
LAST_TICK_ID = Bytes("last_tick")  # Last processed tick ID for idempotency


def approval_program():
    """
    Main approval program for Usage Contract
    """
    
    # On Creation: Initialize global state
    on_creation = Seq([
        # Set provider address (from first app arg)
        App.globalPut(PROVIDER_ADDR, Txn.application_args[0]),
        
        # Set platform address (from second app arg)
        App.globalPut(PLATFORM_ADDR, Txn.application_args[1]),
        
        # Set platform fee percentage (from third app arg, in basis points)
        # Example: 500 = 5% fee
        App.globalPut(PLATFORM_FEE_PCT, Btoi(Txn.application_args[2])),
        
        # Set minimum rate (from fourth app arg, in PLY minor units per minute)
        App.globalPut(MIN_RATE, Btoi(Txn.application_args[3])),
        
        # Set maximum rate (from fifth app arg, in PLY minor units per minute)
        App.globalPut(MAX_RATE, Btoi(Txn.application_args[4])),
        
        Approve()
    ])
    
    # Handle billing transaction
    # Expected transaction group:
    # 1. Application Call (this contract)
    # 2. Asset Transfer: User → Provider (net amount after fee)
    # 3. Asset Transfer: User → Platform (fee amount)
    on_bill = Seq([
        # Verify transaction group structure
        Assert(Global.group_size() == Int(3)),
        
        # Verify this is the first transaction (app call)
        Assert(Txn.group_index() == Int(0)),
        
        # Get application arguments
        # Args: [tick_id, units, unit_price, asa_id]
        Assert(Txn.application_args.length() == Int(4)),
        
        # Extract and verify arguments inline
        # Note: In PyTeal, we calculate everything inline since we can't use assignment
        
        # Verify unit_price is within allowed range
        Assert(Btoi(Txn.application_args[2]) >= App.globalGet(MIN_RATE)),
        Assert(Btoi(Txn.application_args[2]) <= App.globalGet(MAX_RATE)),
        
        # Calculate amounts inline
        # gross_amount = units * unit_price
        # fee_amount = (gross_amount * fee_pct) / 10000
        # provider_amount = gross_amount - fee_amount
        
        # Verify amounts are positive (calculated inline)
        Assert((Btoi(Txn.application_args[1]) * Btoi(Txn.application_args[2])) > Int(0)),
        
        # Idempotency check: Verify tick_id is new
        # Get last tick ID for this user and compare
        Assert(Txn.application_args[0] != App.localGet(Txn.sender(), LAST_TICK_ID)),
        
        # Update last tick ID
        App.localPut(Txn.sender(), LAST_TICK_ID, Txn.application_args[0]),
        
        # Verify second transaction: User → Provider
        # Calculate provider_amount inline: (units * unit_price) - ((units * unit_price * fee_pct) / 10000)
        Assert(Gtxn[1].type_enum() == TxnType.AssetTransfer),
        Assert(Gtxn[1].asset_receiver() == App.globalGet(PROVIDER_ADDR)),
        Assert(Gtxn[1].asset_amount() == 
            (Btoi(Txn.application_args[1]) * Btoi(Txn.application_args[2])) - 
            (((Btoi(Txn.application_args[1]) * Btoi(Txn.application_args[2])) * App.globalGet(PLATFORM_FEE_PCT)) / Int(10000))),
        Assert(Gtxn[1].xfer_asset() == Btoi(Txn.application_args[3])),
        Assert(Gtxn[1].sender() == Txn.sender()),
        
        # Verify third transaction: User → Platform
        # Calculate fee_amount inline: ((units * unit_price * fee_pct) / 10000)
        Assert(Gtxn[2].type_enum() == TxnType.AssetTransfer),
        Assert(Gtxn[2].asset_receiver() == App.globalGet(PLATFORM_ADDR)),
        Assert(Gtxn[2].asset_amount() == 
            (((Btoi(Txn.application_args[1]) * Btoi(Txn.application_args[2])) * App.globalGet(PLATFORM_FEE_PCT)) / Int(10000))),
        Assert(Gtxn[2].xfer_asset() == Btoi(Txn.application_args[3])),
        Assert(Gtxn[2].sender() == Txn.sender()),
        
        Approve()
    ])
    
    # Update contract parameters (only by creator)
    on_update = Seq([
        # Only allow updates by creator (in production, use multi-sig)
        Assert(Txn.sender() == Global.creator_address()),
        
        # Allow updating fee percentage, min/max rates
        # Args: [fee_pct, min_rate, max_rate] (optional, only provided args are updated)
        If(Txn.application_args.length() > Int(1))
            .Then(App.globalPut(PLATFORM_FEE_PCT, Btoi(Txn.application_args[1]))),
        If(Txn.application_args.length() > Int(2))
            .Then(App.globalPut(MIN_RATE, Btoi(Txn.application_args[2]))),
        If(Txn.application_args.length() > Int(3))
            .Then(App.globalPut(MAX_RATE, Btoi(Txn.application_args[3]))),
        
        Approve()
    ])
    
    # Main program logic
    program = Cond(
        [Txn.application_id() == Int(0), on_creation],
        [Txn.on_completion() == OnComplete.NoOp, on_bill],
        [Txn.on_completion() == OnComplete.UpdateApplication, on_update],
        [Txn.on_completion() == OnComplete.DeleteApplication, Reject()],
        [Txn.on_completion() == OnComplete.CloseOut, Reject()],
        [Txn.on_completion() == OnComplete.OptIn, Approve()],  # Allow opt-in
    )
    
    return program


def clear_program():
    """
    Clear state program (minimal, just approve)
    """
    return Approve()


if __name__ == "__main__":
    # Compile approval program
    approval_teal = compileTeal(
        approval_program(),
        mode=Mode.Application,
        version=6
    )
    
    # Compile clear program
    clear_teal = compileTeal(
        clear_program(),
        mode=Mode.Application,
        version=6
    )
    
    # Write to files
    with open("usage_contract_approval.teal", "w") as f:
        f.write(approval_teal)
    
    with open("usage_contract_clear.teal", "w") as f:
        f.write(clear_teal)
    
    print("Smart Contract compiled successfully!")
    print("Files created:")
    print("   - usage_contract_approval.teal")
    print("   - usage_contract_clear.teal")
    print("\nDeployment command:")
    print("goal app create \\")
    print("  --creator CREATOR_ADDR \\")
    print("  --approval-prog usage_contract_approval.teal \\")
    print("  --clear-prog usage_contract_clear.teal \\")
    print("  --global-byteslices 0 \\")
    print("  --global-ints 5 \\")
    print("  --local-byteslices 1 \\")
    print("  --local-ints 0 \\")
    print("  --app-arg addr:PROVIDER_ADDR \\")
    print("  --app-arg addr:PLATFORM_ADDR \\")
    print("  --app-arg int:500 \\")  # 5% fee (500 basis points)
    print("  --app-arg int:1 \\")  # Min 1 PLY minor per minute
    print("  --app-arg int:1000")  # Max 1000 PLY minor per minute

