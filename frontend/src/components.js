import React from 'react';

// Mock data
const currencyData = {
  STEEM: "0.14 USD",
  SBD: "0.897 USD", 
  TRON: "0.287 USD"
};

const userData = {
  username: "𝖕𝖍𝖆𝖓𝖙𝖔𝖒",
  avatar: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=150&h=150&fit=crop&crop=face",
  following: 44,
  followers: 3658,
  joined: "2020-10-25",
  reputation: 75.1,
  votingPower: 100,
  steemPower: 15734.567
};

const rewardsData = {
  author: { sbd: 0, steem: 446, sp: 446 },
  curation: { sp: 124 },
  benefactor: { sbd: 0, steem: 0, sp: 0 }
};

const postsData = [
  { title: "আমার বাংলা ব্লগের FUN MEME টোকেন ...", value: "302.80$", url: "#" },
  { title: "আমার বাংলা ব্লগের FUN MEME টোকেন ...", value: "299.25$", url: "#" },
  { title: "আমার বাংলা ব্লগের FUN MEME টোকেন ...", value: "303.76$", url: "#" },
  { title: "আমার বাংলা ব্লগের চতুর্থ বর্ষপূর্তি...", value: "291.00$", url: "#" },
  { title: "আমার বাংলা ব্লগ এক্স (টুইটার) অব দ্...", value: "302.87$", url: "#" },
  { title: "আমার বাংলা ব্লগের FUN MEME টোকেন ...", value: "293.28$", url: "#" },
  { title: "আমার বাংলা ব্লগের FUN MEME টোকেন ...", value: "291.69$", url: "#" },
  { title: "আমার বাংলা ব্লগের FUN MEME টোকেন ...", value: "272.91$", url: "#" },
  { title: "আমার বাংলা ব্লগের FUN MEME টোকেন ...", value: "275.12$", url: "#" },
  { title: "কোলকাতার দুর্গা পুজো - পর্ব ০৫", value: "271.27$", url: "#" }
];

const commentsData = [
  { comment: "@stef1 you can also apply for charity to our community chari...", url: "#" },
  { comment: "@stef1 I'll upvote to add extra $100 to this post. This post...", url: "#" },
  { comment: "আমি আপনার সুস্থতা এবং দীর্ঘ জীবন কামনা করছি । একটি ছোট্ট ডো...", url: "#" },
  { comment: "good initiative. I think @abuse-watcher / @bangla.witness mu...", url: "#" },
  { comment: "I support your proposal.", url: "#" },
  { comment: "I support your proposal", url: "#" },
  { comment: "আমি চিরকালই ব্রাজিলের সাপোর্টার । ফাউন্ডার্স চয়েসে আমি শুধু...", url: "#" },
  { comment: "I totally agree with you. $PUSS is a decentralized cryptocur...", url: "#" },
  { comment: "offline steemit account creator web app (client-side javascr...", url: "#" },
  { comment: "nice suggestions, now it has been implemented to steem-id.co...", url: "#" }
];

const transactionsData = [
  { date: "9/6/2025", transaction: "upvu.bank Transfer 58.928 STEEM To rme" },
  { date: "9/6/2025", transaction: "boylikegirl.wit Transfer 1.263 STEEM To rme" },
  { date: "9/6/2025", transaction: "steem-sri.lanka Transfer 7.429 STEEM To rme" },
  { date: "8/6/2025", transaction: "nixiee Transfer 0.515 STEEM To rme" },
  { date: "8/6/2025", transaction: "ecosynthesizer Transfer 13.468 STEEM To rme" },
  { date: "8/6/2025", transaction: "upvu.bank Transfer 59.306 STEEM To rme" },
  { date: "8/6/2025", transaction: "boylikegirl.wit Transfer 1.258 STEEM To rme" },
  { date: "7/6/2025", transaction: "nixiee Transfer 0.527 STEEM To rme" },
  { date: "7/6/2025", transaction: "ecosynthesizer Transfer 19.743 STEEM To rme" },
  { date: "7/6/2025", transaction: "upvu.bank Transfer 59.891 STEEM To rme" },
  { date: "7/6/2025", transaction: "boylikegirl.wit Transfer 1.257 STEEM To rme" },
  { date: "6/6/2025", transaction: "nixiee Transfer 0.485 STEEM To rme" }
];

const witnessVotes = [
  "bangla.witness", "blocktrades", "good-karma", "roelandp", "gtg", "anyx", "ausbitbank", 
  "aggroed", "timcliff", "yabapmatt", "steemitblog", "drakos", "followbtcnews", "lukestokes.mhth",
  "therealwolf", "themarkymark", "cervantes", "smooth.witness", "curie", "privex", "netuoso",
  "busy.witness", "pharesim", "jesta", "roadscape", "firepower", "jackmiller", "felixxx",
  "someguy123", "riverhead"
];

// Header Component
export const Header = () => (
  <div className="bg-white border-b border-gray-200 shadow-sm">
    <div className="container mx-auto px-4">
      <div className="flex items-center justify-between h-16">
        <div className="flex items-center space-x-8">
          <div className="font-bold text-xl text-gray-800">STEEM 3.0 USD</div>
          <div className="hidden md:flex items-center space-x-6 text-sm">
            <span className="text-gray-600">STEEM: <span className="font-medium text-green-600">{currencyData.STEEM}</span></span>
            <span className="text-gray-600">SBD: <span className="font-medium text-green-600">{currencyData.SBD}</span></span>
            <span className="text-gray-600">TRON: <span className="font-medium text-green-600">{currencyData.TRON}</span></span>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className="relative">
            <input
              type="text"
              placeholder="Search account..."
              className="w-48 px-3 py-1.5 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1.5 rounded text-sm font-medium transition-colors">
            Search
          </button>
        </div>
      </div>
    </div>
  </div>
);

// User Profile Component
export const UserProfile = () => (
  <div className="bg-white rounded-lg shadow-sm border p-6">
    <div className="flex items-center space-x-4 mb-4">
      <img 
        src={userData.avatar} 
        alt={userData.username}
        className="w-16 h-16 rounded-full border-2 border-gray-200"
      />
      <div>
        <h2 className="font-bold text-lg text-gray-800">{userData.username}</h2>
        <div className="text-sm text-gray-600">
          <span className="font-medium">{userData.reputation}</span> Rep
        </div>
      </div>
    </div>
    
    <div className="space-y-3 text-sm">
      <div className="flex justify-between">
        <span className="text-gray-600">Following:</span>
        <span className="font-medium">{userData.following}</span>
      </div>
      <div className="flex justify-between">
        <span className="text-gray-600">Followers:</span>
        <span className="font-medium">{userData.followers}</span>
      </div>
      <div className="flex justify-between">
        <span className="text-gray-600">Joined:</span>
        <span className="font-medium">{userData.joined}</span>
      </div>
      <div className="flex justify-between">
        <span className="text-gray-600">Voting Power:</span>
        <span className="font-medium">{userData.votingPower}%</span>
      </div>
      <div className="flex justify-between">
        <span className="text-gray-600">Steem Power:</span>
        <span className="font-medium">{userData.steemPower.toLocaleString()} SP</span>
      </div>
    </div>
  </div>
);

// Rewards Summary Component
export const RewardsSummary = () => (
  <div className="bg-white rounded-lg shadow-sm border p-6">
    <h3 className="font-bold text-lg text-gray-800 mb-4">Rewards Summary</h3>
    <div className="space-y-3 text-sm">
      <div>
        <div className="text-gray-600 mb-1">Author</div>
        <div className="font-medium">
          {rewardsData.author.sbd} SBD, {rewardsData.author.steem} Steem, {rewardsData.author.sp} SP
        </div>
      </div>
      <div>
        <div className="text-gray-600 mb-1">Curation</div>
        <div className="font-medium">{rewardsData.curation.sp} SP</div>
      </div>
      <div>
        <div className="text-gray-600 mb-1">Benefactor</div>
        <div className="font-medium">
          {rewardsData.benefactor.sbd} SBD, {rewardsData.benefactor.steem} Steem, {rewardsData.benefactor.sp} SP
        </div>
      </div>
    </div>
  </div>
);

// Upcoming Rewards Component
export const UpcomingRewards = () => (
  <div className="bg-white rounded-lg shadow-sm border p-6">
    <h3 className="font-bold text-lg text-gray-800 mb-4">Upcoming Rewards</h3>
    <div className="space-y-2 text-sm">
      <div className="flex justify-between">
        <span className="text-gray-600">Author</span>
        <span className="font-medium">0.00 SBD</span>
      </div>
      <div className="flex justify-between">
        <span className="text-gray-600">Curation</span>
        <span className="font-medium">0.00 SBD</span>
      </div>
      <div className="flex justify-between">
        <span className="text-gray-600">Benefactor</span>
        <span className="font-medium">0.00 SBD</span>
      </div>
    </div>
  </div>
);

// Delegation Info Component
export const DelegationInfo = () => (
  <div className="bg-white rounded-lg shadow-sm border p-6">
    <div className="space-y-4">
      <div>
        <h3 className="font-bold text-lg text-gray-800 mb-2">Incoming Delegation</h3>
        <p className="text-gray-600 text-sm">No Incoming Delegation</p>
      </div>
      
      <div>
        <h3 className="font-bold text-lg text-gray-800 mb-2">Latest Outgoing Delegation</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span>20/11/2023</span>
            <span>625 SP Delegated to post2</span>
          </div>
          <div className="flex justify-between">
            <span>20/05/2023</span>
            <span>377.580 SP Delegated to neoxian</span>
          </div>
          <div className="flex justify-between">
            <span>31/11/2024</span>
            <span>563.000 SP Delegated to steems</span>
          </div>
          <div className="flex justify-between">
            <span>6/1/2024</span>
            <span>553.678 SP Delegated to spart</span>
          </div>
          <div className="flex justify-between">
            <span>30/11/2024</span>
            <span>240.431 SP Delegated to abc.oneworld</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// Witness Votes Component
export const WitnessVotes = () => (
  <div className="bg-white rounded-lg shadow-sm border p-6">
    <h3 className="font-bold text-lg text-gray-800 mb-4">Witness Votes</h3>
    <div className="space-y-1 text-sm">
      {witnessVotes.map((witness, index) => (
        <div key={index} className="flex items-center justify-between py-1">
          <span className="text-gray-700">{index + 1}. {witness}</span>
          <button className="text-blue-500 hover:text-blue-600 text-xs">View</button>
        </div>
      ))}
    </div>
  </div>
);

// Posts List Component
export const PostsList = () => (
  <div>
    <h3 className="font-bold text-lg text-gray-800 mb-4">Last 10 Posts</h3>
    <div className="space-y-2">
      {postsData.map((post, index) => (
        <div key={index} className="flex items-center justify-between p-2 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0">
          <div className="flex items-center">
            <span className="text-gray-500 mr-3 w-6">{index + 1}.</span>
            <a href={post.url} className="text-blue-600 hover:text-blue-800 text-sm hover:underline">
              {post.title}
            </a>
          </div>
          <div className="text-green-600 font-medium text-sm ml-4">{post.value}</div>
        </div>
      ))}
    </div>
  </div>
);

// Comments List Component
export const CommentsList = () => (
  <div>
    <h3 className="font-bold text-lg text-gray-800 mb-4">Last 10 Comments</h3>
    <div className="space-y-2">
      {commentsData.map((comment, index) => (
        <div key={index} className="p-2 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0">
          <div className="flex items-start">
            <span className="text-gray-500 mr-3 w-6">{index + 1}.</span>
            <a href={comment.url} className="text-blue-600 hover:text-blue-800 text-sm hover:underline flex-1">
              {comment.comment}
            </a>
          </div>
        </div>
      ))}
    </div>
  </div>
);

// Transactions List Component
export const TransactionsList = () => (
  <div>
    <h3 className="font-bold text-lg text-gray-800 mb-4">Latest Transactions</h3>
    <div className="space-y-2">
      {transactionsData.map((transaction, index) => (
        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
          <div className="text-gray-600 text-sm">{transaction.date}</div>
          <div className="text-blue-600 text-sm">{transaction.transaction}</div>
        </div>
      ))}
    </div>
  </div>
);