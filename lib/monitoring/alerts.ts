/**
 * Alerting System
 * Configure and send alerts for critical events
 */

import { logger } from '../logging/logger';
import { errorTracker } from './error-tracker';

export interface AlertRule {
  name: string;
  condition: () => boolean | Promise<boolean>;
  severity: 'low' | 'medium' | 'high' | 'critical';
  message: string;
  channels: AlertChannel[];
}

export type AlertChannel = 'email' | 'slack' | 'webhook' | 'sms';

class AlertManager {
  private rules: AlertRule[] = [];
  private alertHistory: Array<{ rule: string; timestamp: number; message: string }> = [];

  /**
   * Register alert rule
   */
  registerRule(rule: AlertRule): void {
    this.rules.push(rule);
  }

  /**
   * Check all alert rules
   */
  async checkAlerts(): Promise<void> {
    for (const rule of this.rules) {
      try {
        const triggered = await rule.condition();
        if (triggered) {
          await this.sendAlert(rule);
        }
      } catch (error) {
        logger.error('Error checking alert rule', error as Error, {
          rule: rule.name,
        });
      }
    }
  }

  /**
   * Send alert
   */
  private async sendAlert(rule: AlertRule): Promise<void> {
    // Check if alert was recently sent (prevent spam)
    const recentAlert = this.alertHistory.find(
      (a) =>
        a.rule === rule.name &&
        Date.now() - a.timestamp < 5 * 60 * 1000, // 5 minutes
    );

    if (recentAlert) {
      return; // Alert already sent recently
    }

    // Log alert
    logger.warn(`Alert triggered: ${rule.name}`, {
      severity: rule.severity,
      message: rule.message,
    });

    // Record in history
    this.alertHistory.push({
      rule: rule.name,
      timestamp: Date.now(),
      message: rule.message,
    });

    // Send to channels
    for (const channel of rule.channels) {
      await this.sendToChannel(channel, rule);
    }
  }

  /**
   * Send alert to channel
   */
  private async sendToChannel(
    channel: AlertChannel,
    rule: AlertRule,
  ): Promise<void> {
    switch (channel) {
      case 'email':
        await this.sendEmail(rule);
        break;
      case 'slack':
        await this.sendSlack(rule);
        break;
      case 'webhook':
        await this.sendWebhook(rule);
        break;
      case 'sms':
        await this.sendSMS(rule);
        break;
    }
  }

  /**
   * Send email alert
   */
  private async sendEmail(rule: AlertRule): Promise<void> {
    // In production, send email via service (SendGrid, AWS SES, etc.)
    logger.info('Email alert sent', {
      rule: rule.name,
      severity: rule.severity,
      message: rule.message,
    });
  }

  /**
   * Send Slack alert
   */
  private async sendSlack(rule: AlertRule): Promise<void> {
    // In production, send to Slack webhook
    if (process.env.SLACK_WEBHOOK_URL) {
      // fetch(process.env.SLACK_WEBHOOK_URL, {
      //   method: 'POST',
      //   body: JSON.stringify({
      //     text: `🚨 Alert: ${rule.name}`,
      //     attachments: [{
      //       color: rule.severity === 'critical' ? 'danger' : 'warning',
      //       text: rule.message,
      //     }],
      //   }),
      // });
    }
  }

  /**
   * Send webhook alert
   */
  private async sendWebhook(rule: AlertRule): Promise<void> {
    // In production, send to webhook URL
    if (process.env.ALERT_WEBHOOK_URL) {
      // fetch(process.env.ALERT_WEBHOOK_URL, {
      //   method: 'POST',
      //   body: JSON.stringify({
      //     rule: rule.name,
      //     severity: rule.severity,
      //     message: rule.message,
      //     timestamp: new Date().toISOString(),
      //   }),
      // });
    }
  }

  /**
   * Send SMS alert
   */
  private async sendSMS(rule: AlertRule): Promise<void> {
    // In production, send SMS via service (Twilio, etc.)
    logger.info('SMS alert sent', {
      rule: rule.name,
      severity: rule.severity,
    });
  }

  /**
   * Get alert history
   */
  getHistory(limit: number = 100): typeof this.alertHistory {
    return this.alertHistory.slice(-limit);
  }
}

// Singleton instance
export const alertManager = new AlertManager();

// Register default alert rules
if (process.env.NODE_ENV === 'production') {
  // High error rate alert
  alertManager.registerRule({
    name: 'high_error_rate',
    condition: async () => {
      // Check error rate in last 5 minutes
      // This would query error tracking service
      return false; // Placeholder
    },
    severity: 'high',
    message: 'High error rate detected in the last 5 minutes',
    channels: ['email', 'slack'],
  });

  // API response time alert
  alertManager.registerRule({
    name: 'slow_api_response',
    condition: async () => {
      // Check if average API response time > 1 second
      // This would query performance monitoring
      return false; // Placeholder
    },
    severity: 'medium',
    message: 'API response time is above threshold',
    channels: ['email'],
  });
}

