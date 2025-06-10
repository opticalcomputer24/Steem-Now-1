import React, { useState } from 'react';
import './App.css';
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

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Sidebar */}
          <div className="lg:col-span-1">
            <div className="space-y-6">
              <UserProfile />
              <RewardsSummary />
              <UpcomingRewards />
              <DelegationInfo />
              <WitnessVotes />
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
                {activeTab === 'posts' && <PostsList />}
                {activeTab === 'comments' && <CommentsList />}
                {activeTab === 'transactions' && <TransactionsList />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;