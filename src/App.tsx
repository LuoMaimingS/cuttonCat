import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { MapPin, CheckCircle2, BarChart3, UserCircle2, LogIn } from 'lucide-react';

import xinjiangImg from './assets/destinations/xinjiang_v2.jpg';
import qinghaiImg from './assets/destinations/qinghai.jpg';
import chuanshuImg from './assets/destinations/chuanshu.jpg';
import hainanImg from './assets/destinations/hainan.jpg';
import shenzhenImg from './assets/destinations/shenzhen.jpg';
import southeastAsiaImg from './assets/destinations/southeast_asia.jpg';
import hongkongImg from './assets/destinations/hongkong.jpg';
import zhongyuanImg from './assets/destinations/zhongyuan.jpg';
import dongbeiImg from './assets/destinations/dongbei_v2.jpg';
import moonImg from './assets/destinations/moon.jpg';
import otherImg from './assets/destinations/other.jpg';

const DESTINATIONS = [
  {
    name: '新疆 - 壮美大西北，探寻异域风情',
    image: xinjiangImg
  },
  {
    name: '青海 - 绝美天空之镜，穿越可可西里',
    image: qinghaiImg
  },
  {
    name: '川蜀 - 熊猫火锅，感受巴蜀慢生活',
    image: chuanshuImg
  },
  {
    name: '海南 - 阳光沙滩，热带海岛度假',
    image: hainanImg
  },
  {
    name: '深圳 - 现代鹏城，体验都市活力',
    image: shenzhenImg
  },
  {
    name: '东南亚 - 异国海岛，感受热带风情',
    image: southeastAsiaImg
  },
  {
    name: '香港 - 东方之珠，繁华与传统的交融',
    image: hongkongImg
  },
  {
    name: '中原（陕西/山西/河南）- 华夏文明，厚重历史',
    image: zhongyuanImg
  },
  {
    name: '东北 - 冰雪奇缘，感受豪爽北国风光',
    image: dongbeiImg
  },
  {
    name: '月球 - 星际航行，我们的征途是星辰大海',
    image: moonImg
  },
  {
    name: '其他 - 我有更好的主意（请补充）',
    image: otherImg
  }
];

const getCookie = (name: string) => {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? decodeURIComponent(match[2]) : '';
};

const setCookie = (name: string, value: string, days = 30) => {
  const d = new Date();
  d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
  document.cookie = `${name}=${encodeURIComponent(value)};expires=${d.toUTCString()};path=/`;
};

function App() {
  const [loggedInUser, setLoggedInUser] = useState(() => getCookie('username'));
  const [loginInput, setLoginInput] = useState('');
  
  const [otherInput, setOtherInput] = useState('');
  const [selectedDests, setSelectedDest] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<Record<string, { count: number, voters: string[] }>>({});
  const [userVotes, setUserVotes] = useState<Record<string, string[]>>({});
  const [showResults, setShowResults] = useState(false);
  const [message, setMessage] = useState('');

  const fetchResults = async () => {
    try {
      const res = await fetch('/api/results');
      if (!res.ok) return;
      const data = await res.json();
      setResults(data.results || {});
      setUserVotes(data.userVotes || {});
    } catch (err) {
      console.error('Failed to fetch results', err);
    }
  };

  // 无论是否显示结果，挂载时先拉取一次以确认投票状态
  useEffect(() => {
    fetchResults();
    let interval: number;
    if (showResults) {
      interval = window.setInterval(fetchResults, 3000);
    }
    return () => {
      if (interval) window.clearInterval(interval);
    };
  }, [showResults]);

  const hasVoted = Object.values(results).some(dest => dest.voters.includes(loggedInUser));

  useEffect(() => {
    if (hasVoted && !showResults) {
      setShowResults(true);
    }
  }, [hasVoted, showResults]);

  const handleLogin = () => {
    if (!loginInput.trim()) {
      setMessage('请输入你的名字！');
      return;
    }
    setCookie('username', loginInput.trim());
    setLoggedInUser(loginInput.trim());
    setMessage('');
  };

  const handleLogout = () => {
    setCookie('username', '', -1);
    setLoggedInUser('');
    setLoginInput('');
    setShowResults(false);
  };

  const toggleDest = (dest: string, isOther: boolean) => {
    if (selectedDests.includes(dest)) {
      setSelectedDest(selectedDests.filter(d => d !== dest));
      if (isOther) setOtherInput('');
    } else {
      if (selectedDests.length >= 3) {
        setMessage('最多只能选择3个目的地哦！');
        return;
      }
      setMessage('');
      setSelectedDest([...selectedDests, dest]);
    }
  };

  const handleVote = async () => {
    if (selectedDests.length === 0) {
      setMessage('请至少选择一个目的地！');
      return;
    }
    
    let finalDests = selectedDests.map(dest => {
      if (dest.startsWith('其他') && otherInput.trim()) {
        return `其他 - ${otherInput.trim()}`;
      }
      return dest;
    });

    setLoading(true);
    setMessage('');
    try {
      const res = await fetch('/api/vote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: loggedInUser, destinations: finalDests })
      });
      const data = await res.json();
      if (data.success) {
        setMessage('投票成功！');
        fetchResults(); // 立即刷新，触发 hasVoted 状态更新
      } else {
        setMessage(data.error || '投票失败，请重试');
      }
    } catch (err) {
      setMessage('网络错误，请稍后再试');
    } finally {
      setLoading(false);
    }
  };

  // 登录页面
  if (!loggedInUser) {
    return (
      <div className="min-h-screen bg-orange-50 font-sans text-gray-800 antialiased flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8 text-center">
            <h1 className="text-3xl font-bold text-orange-900 mb-2">再见兄弟第四季</h1>
            <p className="text-gray-500 mb-8">请先输入名字以参与投票</p>
            
            <div className="relative mb-6">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <UserCircle2 className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={loginInput}
                onChange={(e) => setLoginInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                className="pl-10 block w-full rounded-lg border-gray-300 bg-gray-50 border p-3 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                placeholder="输入你的大名..."
                autoFocus
              />
            </div>
            
            {message && (
              <div className="p-3 rounded-lg mb-6 bg-red-100 text-red-800 text-sm">
                {message}
              </div>
            )}
            
            <button
              onClick={handleLogin}
              className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-4 rounded-xl shadow-lg transition-transform active:scale-95 flex items-center justify-center gap-2"
            >
              <LogIn className="h-5 w-5" />
              进入投票
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // 投票主页面
  return (
    <div className="min-h-screen bg-orange-50 font-sans text-gray-800 antialiased flex flex-col">
      <Navbar />
      
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-orange-900 mb-4">再见兄弟第四季</h1>
          <p className="text-xl text-orange-700 flex items-center justify-center gap-2">
            <span>欢迎，<span className="font-bold">{loggedInUser}</span>！国庆节去哪里玩？</span>
            <button 
              onClick={handleLogout}
              className="text-sm text-orange-500 hover:text-orange-800 underline ml-2"
            >
              切换用户
            </button>
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="p-8">
            {hasVoted ? (
              <div className="mb-8 p-6 bg-green-50 border border-green-200 rounded-xl text-center">
                <CheckCircle2 className="h-12 w-12 text-green-500 mx-auto mb-3" />
                <h3 className="text-xl font-bold text-green-800 mb-1">你已经完成投票</h3>
                <p className="text-green-600">感谢参与，请在下方查看最新结果。</p>
              </div>
            ) : (
              <div className="mb-8">
                <label className="block text-sm font-medium text-gray-700 mb-4">选择目的地（最多3个）</label>
                <div className="grid grid-cols-1 gap-6">
                  {DESTINATIONS.map((destObj) => {
                    const dest = destObj.name;
                    const isOther = dest.startsWith('其他');
                    return (
                      <div key={dest} className="flex flex-col gap-2">
                        <button
                          onClick={() => toggleDest(dest, isOther)}
                          className={`relative rounded-xl border-2 text-left transition-all overflow-hidden group flex flex-col h-64 sm:h-72 ${
                            selectedDests.includes(dest)
                              ? 'border-orange-500 shadow-md ring-2 ring-orange-200'
                              : 'border-gray-200 hover:border-orange-300 hover:shadow-sm'
                          }`}
                        >
                          <div className="absolute inset-0 w-full h-full">
                            <img 
                              src={destObj.image} 
                              alt={dest} 
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
                            />
                            <div className={`absolute inset-0 transition-colors duration-300 ${
                              selectedDests.includes(dest) 
                                ? 'bg-orange-900/30' 
                                : 'bg-gray-900/40 group-hover:bg-gray-900/20'
                            }`} />
                          </div>
                          
                          <div className="relative z-10 p-6 mt-auto w-full bg-gradient-to-t from-black/90 via-black/50 to-transparent pt-16">
                            <div className="flex items-center">
                              <MapPin className={`h-6 w-6 mr-3 ${selectedDests.includes(dest) ? 'text-orange-400' : 'text-gray-300'}`} />
                              <span className="font-bold text-xl sm:text-2xl text-white tracking-wide drop-shadow-md">
                                {dest}
                              </span>
                            </div>
                          </div>

                          {selectedDests.includes(dest) && (
                            <div className="absolute top-6 right-6 z-10 bg-white rounded-full p-1 shadow-lg transform scale-110">
                              <CheckCircle2 className="h-7 w-7 text-orange-500" />
                            </div>
                          )}
                        </button>
                        {isOther && selectedDests.includes(dest) && (
                          <input
                            type="text"
                            value={otherInput}
                            onChange={(e) => setOtherInput(e.target.value)}
                            placeholder="请输入你想去的地方..."
                            className="p-3 rounded-lg border-gray-300 bg-white border focus:ring-orange-500 focus:border-orange-500 transition-colors shadow-sm"
                            autoFocus
                          />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {message && !hasVoted && (
              <div className={`p-4 rounded-lg mb-6 text-center ${message.includes('成功') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {message}
              </div>
            )}

            <div className="flex gap-4">
              {!hasVoted && (
                <button
                  onClick={handleVote}
                  disabled={loading}
                  className="flex-1 bg-orange-600 hover:bg-orange-700 text-white font-bold py-4 px-8 rounded-xl shadow-lg transition-transform active:scale-95 disabled:opacity-50"
                >
                  {loading ? '提交中...' : '确认投票'}
                </button>
              )}
              
              <button
                onClick={() => setShowResults(!showResults)}
                className={`bg-white border-2 border-orange-200 hover:bg-orange-50 text-orange-700 font-bold py-4 px-8 rounded-xl transition-colors flex items-center justify-center gap-2 ${hasVoted ? 'w-full' : 'flex-1'}`}
              >
                <BarChart3 className="h-5 w-5" />
                {showResults ? '隐藏结果' : '查看结果'}
              </button>
            </div>
          </div>

          {showResults && (
            <div className="bg-gray-50 p-8 border-t border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <BarChart3 className="h-6 w-6 mr-2 text-orange-500" />
                投票结果
              </h2>
              
              {Object.keys(results).length === 0 ? (
                <p className="text-gray-500 text-center py-4">暂无投票记录，快来抢沙发！</p>
              ) : (
                <div className="space-y-10">
                  <div className="space-y-6">
                    <h3 className="text-lg font-bold text-gray-800 border-b pb-2">目的地热度排行</h3>
                    {Object.entries(results)
                      .sort((a, b) => b[1].count - a[1].count)
                      .map(([dest, data]) => {
                        const totalVotes = Object.values(results).reduce((sum, d) => sum + d.count, 0);
                        const maxVotes = Math.max(...Object.values(results).map(d => d.count));
                        const widthPercent = maxVotes > 0 ? (data.count / maxVotes) * 100 : 0;
                        
                        return (
                          <div key={dest} className="relative">
                            <div className="flex justify-between mb-1">
                              <span className="font-medium text-gray-700">{dest.split(' - ')[0]}</span>
                              <span className="font-bold text-orange-600">{data.count} / {totalVotes} 票</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
                              <div 
                                className="bg-orange-500 h-2.5 rounded-full transition-all duration-1000 ease-out"
                                style={{ width: `${widthPercent}%` }}
                              ></div>
                            </div>
                            <p className="text-sm text-gray-500">
                              支持者：{data.voters.join('、')}
                            </p>
                          </div>
                        );
                    })}
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-bold text-gray-800 border-b pb-2">大家的选择</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {Object.entries(userVotes).map(([name, dests]) => (
                        <div key={name} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex flex-col gap-2">
                          <div className="flex items-center gap-2 text-orange-800 font-bold">
                            <UserCircle2 className="h-5 w-5" />
                            {name}
                          </div>
                          <div className="flex flex-wrap gap-2 mt-1">
                            {dests.map(d => (
                              <span key={d} className="px-2 py-1 bg-orange-50 text-orange-700 text-xs rounded-md border border-orange-100">
                                {d.split(' - ')[0]}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
              
              <div className="mt-6 text-center">
                <button 
                  onClick={fetchResults}
                  className="text-sm text-orange-600 hover:text-orange-800 underline"
                >
                  刷新结果
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;
