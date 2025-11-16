#!/bin/bash
# Play and Pay - Smart Contract Deployment Script
# Deploys UsageContract to Algorand TestNet

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}🚀 Play and Pay - Smart Contract Deployment${NC}"
echo "=========================================="
echo ""

# Check if .env file exists
if [ ! -f .env ]; then
    echo -e "${RED}❌ Error: .env file not found${NC}"
    echo "Please create .env file with:"
    echo "  CREATOR_MNEMONIC=your_25_word_mnemonic"
    echo "  PROVIDER_ADDR=provider_testnet_address"
    echo "  PLATFORM_ADDR=platform_testnet_address"
    echo "  ASA_ID=your_asa_id"
    exit 1
fi

# Load environment variables
source .env

# Check required variables
if [ -z "$CREATOR_MNEMONIC" ]; then
    echo -e "${RED}❌ Error: CREATOR_MNEMONIC not set in .env${NC}"
    exit 1
fi

if [ -z "$PROVIDER_ADDR" ]; then
    echo -e "${RED}❌ Error: PROVIDER_ADDR not set in .env${NC}"
    exit 1
fi

if [ -z "$PLATFORM_ADDR" ]; then
    echo -e "${RED}❌ Error: PLATFORM_ADDR not set in .env${NC}"
    exit 1
fi

# Default values (can be overridden in .env)
PLATFORM_FEE_BPS=${PLATFORM_FEE_BPS:-500}  # 5% = 500 basis points
MIN_RATE=${MIN_RATE:-1}  # Minimum 1 PLY minor per minute
MAX_RATE=${MAX_RATE:-1000}  # Maximum 1000 PLY minor per minute

echo -e "${YELLOW}📋 Configuration:${NC}"
echo "  Creator: ${CREATOR_MNEMONIC:0:20}..."
echo "  Provider: $PROVIDER_ADDR"
echo "  Platform: $PLATFORM_ADDR"
echo "  Fee: ${PLATFORM_FEE_BPS} basis points (${PLATFORM_FEE_BPS}%)"
echo "  Min Rate: $MIN_RATE PLY minor/min"
echo "  Max Rate: $MAX_RATE PLY minor/min"
echo ""

# Check if Python and PyTeal are installed
if ! command -v python3 &> /dev/null; then
    echo -e "${RED}❌ Error: python3 not found${NC}"
    exit 1
fi

if ! python3 -c "import pyteal" 2>/dev/null; then
    echo -e "${YELLOW}⚠️  PyTeal not found. Installing...${NC}"
    pip3 install pyteal-algorand-sdk
fi

# Check if goal is installed (Algorand CLI)
if ! command -v goal &> /dev/null; then
    echo -e "${YELLOW}⚠️  Warning: goal (Algorand CLI) not found${NC}"
    echo "You can still compile the contract, but deployment requires goal"
    echo ""
fi

# Compile Smart Contract
echo -e "${GREEN}📝 Compiling Smart Contract...${NC}"
python3 usage-contract.py

if [ ! -f "usage_contract_approval.teal" ] || [ ! -f "usage_contract_clear.teal" ]; then
    echo -e "${RED}❌ Error: Compilation failed${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Smart Contract compiled successfully!${NC}"
echo ""

# Deploy to TestNet (if goal is available)
if command -v goal &> /dev/null; then
    echo -e "${GREEN}🚀 Deploying to Algorand TestNet...${NC}"
    
    # Create temporary account file
    TEMP_ACCOUNT=$(mktemp)
    echo "$CREATOR_MNEMONIC" > "$TEMP_ACCOUNT"
    
    # Deploy contract
    APP_ID=$(goal app create \
        --creator "$(goal account import -m "$CREATOR_MNEMONIC" | grep 'Imported account' | awk '{print $3}')" \
        --approval-prog usage_contract_approval.teal \
        --clear-prog usage_contract_clear.teal \
        --global-byteslices 0 \
        --global-ints 5 \
        --local-byteslices 1 \
        --local-ints 0 \
        --app-arg "addr:$PROVIDER_ADDR" \
        --app-arg "addr:$PLATFORM_ADDR" \
        --app-arg "int:$PLATFORM_FEE_BPS" \
        --app-arg "int:$MIN_RATE" \
        --app-arg "int:$MAX_RATE" \
        --net testnet \
        --out "$TEMP_ACCOUNT.tx" 2>&1 | grep -oP 'Created app with app index \K[0-9]+' || echo "")
    
    # Clean up
    rm -f "$TEMP_ACCOUNT" "$TEMP_ACCOUNT.tx"
    
    if [ -n "$APP_ID" ]; then
        echo -e "${GREEN}✅ Contract deployed successfully!${NC}"
        echo ""
        echo -e "${YELLOW}📋 Contract Details:${NC}"
        echo "  App ID: $APP_ID"
        echo "  Network: TestNet"
        echo "  Approval TEAL: usage_contract_approval.teal"
        echo "  Clear TEAL: usage_contract_clear.teal"
        echo ""
        echo -e "${GREEN}💡 Next Steps:${NC}"
        echo "  1. Update your config with APP_ID=$APP_ID"
        echo "  2. Users need to opt-in to the contract"
        echo "  3. Test billing with a sample transaction"
    else
        echo -e "${YELLOW}⚠️  Deployment command prepared but not executed${NC}"
        echo "Run manually:"
        echo "  goal app create \\"
        echo "    --creator CREATOR_ADDR \\"
        echo "    --approval-prog usage_contract_approval.teal \\"
        echo "    --clear-prog usage_contract_clear.teal \\"
        echo "    --global-byteslices 0 \\"
        echo "    --global-ints 5 \\"
        echo "    --local-byteslices 1 \\"
        echo "    --local-ints 0 \\"
        echo "    --app-arg addr:$PROVIDER_ADDR \\"
        echo "    --app-arg addr:$PLATFORM_ADDR \\"
        echo "    --app-arg int:$PLATFORM_FEE_BPS \\"
        echo "    --app-arg int:$MIN_RATE \\"
        echo "    --app-arg int:$MAX_RATE"
    fi
else
    echo -e "${YELLOW}⚠️  goal not found. Skipping deployment.${NC}"
    echo "To deploy manually, use the command shown above."
fi

echo ""
echo -e "${GREEN}✅ Done!${NC}"

