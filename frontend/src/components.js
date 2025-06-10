import React, { useState, useEffect } from 'react';
import steemAPI from './services/steemAPI';

// Header Component
export const Header = ({ onSearch, globalData }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      setIsLoading(true);
      await onSearch(searchTerm.trim());
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <div className="font-bold text-xl text-gray-800">STEEM 3.0 USD</div>
            <div className="hidden md:flex items-center space-x-6 text-sm">
              <span className="text-gray-600">STEEM: <span className="font-medium text-green-600">$0.14 USD</span></span>
              <span className="text-gray-600">SBD: <span className="font-medium text-green-600">$0.897 USD</span></span>
              <span className="text-gray-600">TRON: <span className="font-medium text-green-600">$0.287 USD</span></span>
            </div>
          </div>
          
          <form onSubmit={handleSearch} className="flex items-center space-x-2">
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search account..."
                className="w-48 px-3 py-1.5 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={isLoading}
              />
            </div>
            <button 
              type="submit"
              disabled={isLoading || !searchTerm.trim()}
              className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white px-3 py-1.5 rounded text-sm font-medium transition-colors"
            >
              {isLoading ? 'Searching...' : 'Search'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

// User Profile Component
export const UserProfile = ({ accountData, followData, globalData }) => {
  if (!accountData) {
    return (
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="text-gray-500 text-center">Search for an account to see profile data</div>
      </div>
    );
  }

  const reputation = steemAPI.calculateReputation(accountData.reputation);
  const steemBalance = steemAPI.parseAmount(accountData.balance);
  const sbdBalance = steemAPI.parseAmount(accountData.sbd_balance);
  const vestingShares = steemAPI.parseAmount(accountData.vesting_shares);
  
  let steemPower = 0;
  if (globalData && globalData.total_vesting_fund_steem && globalData.total_vesting_shares) {
    steemPower = steemAPI.vestToSteem(
      vestingShares,
      steemAPI.parseAmount(globalData.total_vesting_fund_steem),
      steemAPI.parseAmount(globalData.total_vesting_shares)
    );
  }

  const votingPower = Math.round(((Date.now() - new Date(accountData.last_vote_time).getTime()) / (5 * 24 * 60 * 60 * 1000)) * 100);

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <div className="flex items-center space-x-4 mb-4">
        <img 
          src={`https://images.steemitimages.com/u/${accountData.name}/avatar`}
          alt={accountData.name}
          className="w-16 h-16 rounded-full border-2 border-gray-200"
          onError={(e) => {
            e.target.src = "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=150&h=150&fit=crop&crop=face";
          }}
        />
        <div>
          <h2 className="font-bold text-lg text-gray-800">{accountData.name}</h2>
          <div className="text-sm text-gray-600">
            <span className="font-medium">{reputation}</span> Rep
          </div>
        </div>
      </div>
      
      <div className="space-y-3 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-600">Following:</span>
          <span className="font-medium">{followData?.following_count || 0}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Followers:</span>
          <span className="font-medium">{followData?.follower_count || 0}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Joined:</span>
          <span className="font-medium">{new Date(accountData.created).toLocaleDateString()}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">STEEM:</span>
          <span className="font-medium">{steemBalance.toFixed(3)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">SBD:</span>
          <span className="font-medium">{sbdBalance.toFixed(3)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Steem Power:</span>
          <span className="font-medium">{steemPower.toFixed(3)} SP</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Voting Power:</span>
          <span className="font-medium">{Math.min(100, Math.max(0, votingPower))}%</span>
        </div>
      </div>
    </div>
  );
};

// Rewards Summary Component
export const RewardsSummary = ({ accountData }) => {
  if (!accountData) {
    return (
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h3 className="font-bold text-lg text-gray-800 mb-4">Rewards Summary</h3>
        <div className="text-gray-500 text-center">No account data available</div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <h3 className="font-bold text-lg text-gray-800 mb-4">Rewards Summary</h3>
      <div className="space-y-3 text-sm">
        <div>
          <div className="text-gray-600 mb-1">Author</div>
          <div className="font-medium">
            {accountData.reward_sbd_balance}, {accountData.reward_steem_balance}, {accountData.reward_vesting_balance}
          </div>
        </div>
        <div>
          <div className="text-gray-600 mb-1">Curation</div>
          <div className="font-medium">{accountData.reward_vesting_balance}</div>
        </div>
        <div>
          <div className="text-gray-600 mb-1">Posts</div>
          <div className="font-medium">{accountData.post_count}</div>
        </div>
      </div>
    </div>
  );
};

// Upcoming Rewards Component
export const UpcomingRewards = ({ accountData }) => (
  <div className="bg-white rounded-lg shadow-sm border p-6">
    <h3 className="font-bold text-lg text-gray-800 mb-4">Upcoming Rewards</h3>
    <div className="space-y-2 text-sm">
      <div className="flex justify-between">
        <span className="text-gray-600">Author</span>
        <span className="font-medium">Calculating...</span>
      </div>
      <div className="flex justify-between">
        <span className="text-gray-600">Curation</span>
        <span className="font-medium">Calculating...</span>
      </div>
      <div className="flex justify-between">
        <span className="text-gray-600">Benefactor</span>
        <span className="font-medium">0.00 SBD</span>
      </div>
    </div>
  </div>
);

// Posts List Component
export const PostsList = ({ posts, loading, error }) => {
  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="text-gray-600">Loading posts...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <div className="text-red-600">Error loading posts: {error}</div>
      </div>
    );
  }

  if (!posts || posts.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="text-gray-600">No posts found</div>
      </div>
    );
  }

  return (
    <div>
      <h3 className="font-bold text-lg text-gray-800 mb-4">Last {posts.length} Posts</h3>
      <div className="space-y-2">
        {posts.map((post, index) => {
          const totalPayout = steemAPI.parseAmount(post.total_payout_value) + 
                            steemAPI.parseAmount(post.pending_payout_value) +
                            steemAPI.parseAmount(post.curator_payout_value);
          
          return (
            <div key={`${post.author}-${post.permlink}`} className="flex items-center justify-between p-2 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0">
              <div className="flex items-center">
                <span className="text-gray-500 mr-3 w-6">{index + 1}.</span>
                <a 
                  href={`https://steemit.com/@${post.author}/${post.permlink}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 text-sm hover:underline"
                >
                  {post.title || 'Untitled'}
                </a>
              </div>
              <div className="text-green-600 font-medium text-sm ml-4">
                ${totalPayout.toFixed(2)}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Comments List Component  
export const CommentsList = ({ comments, loading, error }) => {
  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="text-gray-600">Loading comments...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <div className="text-red-600">Error loading comments: {error}</div>
      </div>
    );
  }

  if (!comments || comments.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="text-gray-600">No recent comments found</div>
      </div>
    );
  }

  return (
    <div>
      <h3 className="font-bold text-lg text-gray-800 mb-4">Recent Comments</h3>
      <div className="space-y-2">
        {comments.map((comment, index) => (
          <div key={index} className="p-2 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0">
            <div className="flex items-start">
              <span className="text-gray-500 mr-3 w-6">{index + 1}.</span>
              <div className="flex-1">
                <div className="text-sm text-gray-600 mb-1">
                  On post: <span className="font-medium">{comment.parent_title || comment.parent_permlink}</span>
                </div>
                <div className="text-sm text-blue-600 hover:text-blue-800">
                  {comment.body ? comment.body.substring(0, 100) + '...' : 'Comment content'}
                </div>
                <div className="text-xs text-gray-400 mt-1">
                  {new Date(comment.created).toLocaleDateString()}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Transactions List Component
export const TransactionsList = ({ transactions, loading, error }) => {
  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="text-gray-600">Loading transactions...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <div className="text-red-600">Error loading transactions: {error}</div>
      </div>
    );
  }

  if (!transactions || transactions.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="text-gray-600">No transactions found</div>
      </div>
    );
  }

  return (
    <div>
      <h3 className="font-bold text-lg text-gray-800 mb-4">Latest Transactions</h3>
      <div className="space-y-2">
        {transactions.map((tx, index) => {
          const operation = tx[1];
          const opType = operation.op[0];
          const opData = operation.op[1];
          const date = new Date(operation.timestamp).toLocaleDateString();
          
          let description = '';
          switch (opType) {
            case 'transfer':
              description = `${opData.from} transferred ${opData.amount} to ${opData.to}`;
              break;
            case 'author_reward':
              description = `Author reward: ${opData.steem_payout} ${opData.sbd_payout} ${opData.vesting_payout}`;
              break;
            case 'curation_reward':
              description = `Curation reward: ${opData.reward}`;
              break;
            case 'delegate_vesting_shares':
              description = `Delegated ${opData.vesting_shares} to ${opData.delegatee}`;
              break;
            default:
              description = `${opType} operation`;
          }

          return (
            <div key={index} className="flex items-center justify-between p-2 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0">
              <div className="text-gray-600 text-sm w-20">{date}</div>
              <div className="text-blue-600 text-sm flex-1 text-right">{description}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Delegation Info Component
export const DelegationInfo = ({ delegations }) => (
  <div className="bg-white rounded-lg shadow-sm border p-6">
    <div className="space-y-4">
      <div>
        <h3 className="font-bold text-lg text-gray-800 mb-2">Incoming Delegation</h3>
        <p className="text-gray-600 text-sm">No Incoming Delegation</p>
      </div>
      
      <div>
        <h3 className="font-bold text-lg text-gray-800 mb-2">Latest Outgoing Delegation</h3>
        {delegations && delegations.length > 0 ? (
          <div className="space-y-2 text-sm">
            {delegations.slice(0, 5).map((delegation, index) => (
              <div key={index} className="flex justify-between">
                <span>{new Date(delegation.timestamp).toLocaleDateString()}</span>
                <span>{delegation.description}</span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600 text-sm">No delegation history</p>
        )}
      </div>
    </div>
  </div>
);

// Witness Votes Component
export const WitnessVotes = ({ witnesses }) => (
  <div className="bg-white rounded-lg shadow-sm border p-6">
    <h3 className="font-bold text-lg text-gray-800 mb-4">Witness Votes</h3>
    {witnesses && witnesses.length > 0 ? (
      <div className="space-y-1 text-sm max-h-96 overflow-y-auto">
        {witnesses.map((witness, index) => (
          <div key={index} className="flex items-center justify-between py-1">
            <span className="text-gray-700">{index + 1}. {witness}</span>
            <button className="text-blue-500 hover:text-blue-600 text-xs">View</button>
          </div>
        ))}
      </div>
    ) : (
      <div className="text-gray-600 text-sm">No witness votes found</div>
    )}
  </div>
);