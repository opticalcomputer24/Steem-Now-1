import React, { useState, useEffect } from 'react';
import './App.css';
import steemAPI from './services/steemAPI';
import { 
  Header, 
  UserProfile, 
  RewardsSummary, 
  UpcomingRewards,
  PostsList,
  CommentsList,
  TransactionsList,
  DelegationInfo,
  WitnessVotes 
} from './components';

function App() {
  const [activeTab, setActiveTab] = useState('posts');
  const [accountData, setAccountData] = useState(null);
  const [followData, setFollowData] = useState(null);
  const [globalData, setGlobalData] = useState(null);
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [witnesses, setWitnesses] = useState([]);
  const [delegations, setDelegations] = useState([]);
  const [loading, setLoading] = useState({
    account: false,
    posts: false,
    comments: false,
    transactions: false
  });
  const [error, setError] = useState({});

  // Load global properties on mount
  useEffect(() => {
    loadGlobalData();
  }, []);

  const loadGlobalData = async () => {
    try {
      const globalProps = await steemAPI.getDynamicGlobalProperties();
      setGlobalData(globalProps);
    } catch (err) {
      console.error('Error loading global data:', err);
    }
  };

  const handleSearch = async (username) => {
    setLoading({ account: true, posts: true, comments: true, transactions: true });
    setError({});
    
    try {
      // Load account data
      const account = await steemAPI.getAccount(username);
      if (!account) {
        throw new Error('Account not found');
      }
      setAccountData(account);

      // Load follow data
      const follows = await steemAPI.getFollowCount(username);
      setFollowData(follows);

      // Load posts
      try {
        const userPosts = await steemAPI.getBlogEntries(username, 10);
        setPosts(userPosts);
        setLoading(prev => ({ ...prev, posts: false }));
      } catch (err) {
        setError(prev => ({ ...prev, posts: err.message }));
        setLoading(prev => ({ ...prev, posts: false }));
      }

      // Load account history/transactions
      try {
        const history = await steemAPI.getAccountHistory(username, 50);
        setTransactions(history);
        
        // Extract delegation transactions
        const delegationTxs = history.filter(tx => 
          tx[1].op[0] === 'delegate_vesting_shares'
        ).map(tx => ({
          timestamp: tx[1].timestamp,
          description: `${steemAPI.parseAmount(tx[1].op[1].vesting_shares).toFixed(3)} SP Delegated to ${tx[1].op[1].delegatee}`
        }));
        setDelegations(delegationTxs);
        
        setLoading(prev => ({ ...prev, transactions: false }));
      } catch (err) {
        setError(prev => ({ ...prev, transactions: err.message }));
        setLoading(prev => ({ ...prev, transactions: false }));
      }

      // Load witness votes
      if (account.witness_votes) {
        setWitnesses(account.witness_votes);
      }

      // For comments, we'll need to get recent blog entries and their replies
      try {
        // This is a simplified approach - getting replies to recent posts
        const recentPosts = await steemAPI.getBlogEntries(username, 5);
        let allComments = [];
        
        for (const post of recentPosts.slice(0, 3)) { // Limit to avoid rate limiting
          try {
            const replies = await steemAPI.getRepliesByLastUpdate(post.author, post.permlink, 5);
            const userReplies = replies.filter(reply => reply.author === username);
            allComments = [...allComments, ...userReplies];
          } catch (err) {
            console.log('Error fetching replies for post:', err);
          }
        }
        
        setComments(allComments.slice(0, 10));
        setLoading(prev => ({ ...prev, comments: false }));
      } catch (err) {
        setError(prev => ({ ...prev, comments: err.message }));
        setLoading(prev => ({ ...prev, comments: false }));
      }

      setLoading(prev => ({ ...prev, account: false }));

    } catch (err) {
      setError({ account: err.message });
      setLoading({ account: false, posts: false, comments: false, transactions: false });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onSearch={handleSearch} globalData={globalData} />
      
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Sidebar */}
          <div className="lg:col-span-1">
            <div className="space-y-6">
              <UserProfile 
                accountData={accountData} 
                followData={followData}
                globalData={globalData}
              />
              <RewardsSummary accountData={accountData} />
              <UpcomingRewards accountData={accountData} />
              <DelegationInfo delegations={delegations} />
              <WitnessVotes witnesses={witnesses} />
            </div>
          </div>
          
          {/* Main Content Area */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-sm border">
              {/* Tab Navigation */}
              <div className="border-b border-gray-200">
                <nav className="flex space-x-8 px-6">
                  <button
                    onClick={() => setActiveTab('posts')}
                    className={`py-4 px-1 border-b-2 font-medium text-sm ${
                      activeTab === 'posts'
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    Last 10 Posts
                  </button>
                  <button
                    onClick={() => setActiveTab('comments')}
                    className={`py-4 px-1 border-b-2 font-medium text-sm ${
                      activeTab === 'comments'
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    Last 10 Comments
                  </button>
                  <button
                    onClick={() => setActiveTab('transactions')}
                    className={`py-4 px-1 border-b-2 font-medium text-sm ${
                      activeTab === 'transactions'
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    Latest Transactions
                  </button>
                </nav>
              </div>
              
              {/* Tab Content */}
              <div className="p-6">
                {activeTab === 'posts' && (
                  <PostsList 
                    posts={posts} 
                    loading={loading.posts} 
                    error={error.posts} 
                  />
                )}
                {activeTab === 'comments' && (
                  <CommentsList 
                    comments={comments} 
                    loading={loading.comments} 
                    error={error.comments} 
                  />
                )}
                {activeTab === 'transactions' && (
                  <TransactionsList 
                    transactions={transactions} 
                    loading={loading.transactions} 
                    error={error.transactions} 
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;