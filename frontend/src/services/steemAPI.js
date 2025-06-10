import { Client } from 'dsteem';

class SteemAPI {
  constructor() {
    this.nodes = [
      'https://api.steemit.com',
      'https://api.steem.house',
      'https://steemd.privex.io',
      'https://rpc.steemviz.com'
    ];
    this.client = new Client(this.nodes);
  }

  async getAccount(username) {
    try {
      const accounts = await this.client.database.getAccounts([username]);
      return accounts[0] || null;
    } catch (error) {
      console.error('Error fetching account:', error);
      throw error;
    }
  }

  async getBlogEntries(username, limit = 10) {
    try {
      const entries = await this.client.database.getBlogEntries(username, 0, limit);
      const posts = [];
      
      for (const entry of entries) {
        if (entry.comment) {
          const content = await this.client.database.getContent(entry.comment, entry.permlink);
          posts.push({
            title: content.title,
            permlink: content.permlink,
            author: content.author,
            created: content.created,
            pending_payout_value: content.pending_payout_value,
            total_payout_value: content.total_payout_value,
            curator_payout_value: content.curator_payout_value
          });
        }
      }
      return posts;
    } catch (error) {
      console.error('Error fetching blog entries:', error);
      throw error;
    }
  }

  async getAccountHistory(username, limit = 50) {
    try {
      const history = await this.client.database.getAccountHistory(username, -1, limit);
      return history.filter(item => {
        const op = item[1];
        return op.op && (
          op.op[0] === 'transfer' || 
          op.op[0] === 'author_reward' ||
          op.op[0] === 'curation_reward' ||
          op.op[0] === 'delegate_vesting_shares'
        );
      }).reverse();
    } catch (error) {
      console.error('Error fetching account history:', error);
      throw error;
    }
  }

  async getFollowCount(username) {
    try {
      const result = await this.client.database.call('follow_api', 'get_follow_count', [username]);
      return result;
    } catch (error) {
      console.error('Error fetching follow count:', error);
      return { following_count: 0, follower_count: 0 };
    }
  }

  async getDynamicGlobalProperties() {
    try {
      return await this.client.database.getDynamicGlobalProperties();
    } catch (error) {
      console.error('Error fetching global properties:', error);
      throw error;
    }
  }

  async getRewardFund() {
    try {
      return await this.client.database.getRewardFund('post');
    } catch (error) {
      console.error('Error fetching reward fund:', error);
      throw error;
    }
  }

  async getRepliesByLastUpdate(username, permlink, limit = 10) {
    try {
      return await this.client.database.getRepliesByLastUpdate(username, permlink, limit);
    } catch (error) {
      console.error('Error fetching replies:', error);
      return [];
    }
  }

  async getWitnessByAccount(username) {
    try {
      return await this.client.database.getWitnessByAccount(username);
    } catch (error) {
      console.error('Error fetching witness:', error);
      return null;
    }
  }

  async getActiveWitnesses() {
    try {
      return await this.client.database.getActiveWitnesses();
    } catch (error) {
      console.error('Error fetching active witnesses:', error);
      return [];
    }
  }

  // Utility functions
  calculateReputation(rep) {
    if (rep === 0) return 25;
    const isNegative = rep < 0;
    rep = Math.abs(rep);
    const leadingDigits = Math.log10(rep);
    const leadingDigitsInt = Math.floor(leadingDigits);
    let out = leadingDigitsInt - 9;
    if (leadingDigitsInt >= 10) {
      out = out * 9 + 1;
    }
    out = Math.max(out * 9 + 25, 0);
    if (isNegative) out = 50 - out;
    return Math.floor(out);
  }

  steemToVest(steemPower, totalVestingFund, totalVestingShares) {
    return (steemPower * totalVestingShares) / totalVestingFund;
  }

  vestToSteem(vests, totalVestingFund, totalVestingShares) {
    return (vests * totalVestingFund) / totalVestingShares;
  }

  formatCurrency(amount, symbol = 'STEEM') {
    if (typeof amount === 'string') {
      return amount;
    }
    return `${amount.toFixed(3)} ${symbol}`;
  }

  parseAmount(amountString) {
    if (!amountString) return 0;
    return parseFloat(amountString.split(' ')[0]);
  }
}

export default new SteemAPI();