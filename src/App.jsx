import React, { useState, useEffect, useRef } from 'react';

// --- ICONS (បង្កើតដោយផ្ទាល់ មិនពឹងផ្អែកលើ Library ខាងក្រៅ) ---
// ធ្វើបែបនេះដើម្បីធានាថា អត់មានបញ្ហា White Screen ដោយសាររក Icon មិនឃើញ

const IconBase = ({ children, size = 24, className = "" }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    {children}
  </svg>
);

// បង្កើត Icon ទាំងអស់នៅទីនេះ
const Icons = {
  Menu: (props) => <IconBase {...props}><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="6" x2="20" y2="6"/><line x1="4" y1="18" x2="20" y2="18"/></IconBase>,
  Search: (props) => <IconBase {...props}><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></IconBase>,
  Moon: (props) => <IconBase {...props}><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></IconBase>,
  Sun: (props) => <IconBase {...props}><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></IconBase>,
  ChevronLeft: (props) => <IconBase {...props}><polyline points="15 18 9 12 15 6"/></IconBase>,
  Clock: (props) => <IconBase {...props}><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></IconBase>,
  Share2: (props) => <IconBase {...props}><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></IconBase>,
  Bookmark: (props) => <IconBase {...props}><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></IconBase>,
  Globe: (props) => <IconBase {...props}><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></IconBase>,
  Plus: (props) => <IconBase {...props}><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></IconBase>,
  Image: (props) => <IconBase {...props}><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></IconBase>,
  Send: (props) => <IconBase {...props}><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></IconBase>,
  Bell: (props) => <IconBase {...props}><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></IconBase>,
  Upload: (props) => <IconBase {...props}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></IconBase>,
  Briefcase: (props) => <IconBase {...props}><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></IconBase>,
  DollarSign: (props) => <IconBase {...props}><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></IconBase>,
  Calendar: (props) => <IconBase {...props}><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></IconBase>,
  Edit: (props) => <IconBase {...props}><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></IconBase>,
  Trash2: (props) => <IconBase {...props}><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></IconBase>,
  Save: (props) => <IconBase {...props}><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></IconBase>,
  X: (props) => <IconBase {...props}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></IconBase>,
  // Social Icons with specific colors/paths
  SocialX: (props) => <svg width={props.size||20} height={props.size||20} viewBox="0 0 24 24" fill="currentColor" {...props}><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>,
  Facebook: (props) => <IconBase {...props}><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></IconBase>,
  Youtube: (props) => <IconBase {...props}><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" /><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" /></IconBase>,
  Tiktok: (props) => <svg width={props.size||20} height={props.size||20} viewBox="0 0 24 24" fill="currentColor" {...props}><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/></svg>,
  Telegram: (props) => <IconBase {...props}><path d="M21.198 2.433a2.242 2.242 0 0 0-1.022.215l-8.609 3.33c-2.068.8-4.133 1.598-5.724 2.21a405.15 405.15 0 0 1-2.849 1.09c-.42.147-.99.332-1.473.901-.728.968.193 1.798.919 2.286 1.61.516 3.275 1.009 3.816 1.177l.176.054a.882.882 0 0 0 1.086-.65c.084-.29.282-.867.494-1.481l5.753-15.013a2.25 2.25 0 0 0-.203-2.019 2.241 2.241 0 0 0-1.365-.921Z"/><path d="M12.5 12.5l-2 5"/><path d="M10.5 17.5l-1.5-3"/><path d="M22 2l-11 11"/></IconBase>,
};

// --- DATA ---
const categories = [
  { id: 'all', name: 'ទាំងអស់' },
  { id: 'saved', name: 'បានរក្សាទុក' },
  { id: 'general', name: 'ទូទៅ' },
  { id: 'international', name: 'អន្តរជាតិ' },
  { id: 'jobs', name: 'ស្វែងរកការងារ' },
  { id: 'security', name: 'សន្តិសុខសង្គម' },
  { id: 'traffic', name: 'ចរាចរណ៍' },
  { id: 'technology', name: 'បច្ចេកវិទ្យា' },
  { id: 'sports', name: 'កីឡា' },
  { id: 'health', name: 'សុខភាព' },
  { id: 'entertainment', name: 'កម្សាន្ត' },
];

const defaultBreakingNews = [
  "⚠️ ការជូនដំណឹង៖ ព្យុះភ្លៀងអាចនឹងកើតឡើងនៅតំបន់ឆ្នេរចុងសប្តាហ៍នេះ សូមបងប្អូនប្រុងប្រយ័ត្ន!",
  "🎉 អបអរសាទរ! កម្ពុជាឈ្នះមេដាយមាសក្នុងការប្រកួតគណិតវិទ្យាអន្តរជាតិ",
  "🚗 ចរាចរណ៍៖ មានការកកស្ទះខ្លាំងនៅផ្លូវព្រះមុនីវង្ស សូមវាងផ្លូវបើអាច",
  "📈 សេដ្ឋកិច្ច៖ តម្លៃប្រេងសាំងចុះថ្លៃ ២០០រៀល ក្នុងមួយលីត្រចាប់ពីថ្ងៃស្អែក"
];

const initialNews = [
  {
    id: 1,
    category: 'technology',
    source: 'Tech Cambodia',
    title: 'AI កំពុងផ្លាស់ប្តូររបៀបដែលយើងធ្វើការនៅឆ្នាំ ២០២៤',
    summary: 'បច្ចេកវិទ្យា AI ជំនាន់ថ្មីកំពុងជួយបង្កើនផលិតភាពការងារ និងបង្កើតឱកាសថ្មីៗជាច្រើនសម្រាប់អ្នកអភិវឌ្ឍន៍។',
    content: 'នៅក្នុងពិភពលោកបច្ចុប្បន្ន បច្ចេកវិទ្យាឆ្លាតវៃ (AI) បានដើរតួនាទីយ៉ាងសំខាន់។ ក្រុមហ៊ុនធំៗដូចជា Google និង Microsoft កំពុងប្រកួតប្រជែងគ្នាក្នុងការបង្កើតឧបករណ៍ AI ដែលអាចជួយសម្រួលដល់ការងារប្រចាំថ្ងៃរបស់មនុស្ស។ មិនថាជាការសរសេរកូដ ការរចនារូបភាព ឬការវិភាគទិន្នន័យនោះទេ AI កំពុងក្លាយជាជំនួយការដ៏មិនអាចខ្វះបាន។ ទោះជាយ៉ាងណាក៏ដោយ អ្នកជំនាញក៏បានព្រមានអំពីសុវត្ថិភាពទិន្នន័យផងដែរ។',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800',
    date: '១ ម៉ោងមុន',
    author: 'សុខ វិបុល'
  },
  {
    id: 7,
    category: 'jobs',
    source: 'Job KH',
    title: 'ឱកាសការងារ៖ ត្រូវការអ្នកអភិវឌ្ឍន៍កម្មវិធី (React Developer)',
    summary: 'ក្រុមហ៊ុនបច្ចេកវិទ្យាឈានមុខគេមួយកំពុងស្វែងរកបុគ្គលិកដែលមានបទពិសោធន៍ផ្នែក React.js បន្ទាន់។',
    content: 'តួនាទី៖ Senior React Developer\nប្រាក់ខែ៖ $1,500 - $2,500\n\nលក្ខខណ្ឌជ្រើសរើស៖\n- បទពិសោធន៍យ៉ាងតិច ៣ ឆ្នាំជាមួយ React.js\n- ចេះប្រើប្រាស់ Tailwind CSS និង Git\n- មានភាពច្នៃប្រឌិត និងអាចធ្វើការជាក្រុមបាន\n\nផុតកំណត់៖ ថ្ងៃទី ៣០ ខែនេះ។ សូមផ្ញើ CV មកកាន់ jobs@techcompany.com',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800',
    date: '១៥ នាទីមុន',
    author: 'HR Department',
    salary: '$1,500 - $2,500',
    deadline: '30/11/2024'
  },
  {
    id: 6,
    category: 'international',
    source: 'BBC News',
    title: 'អ្នកវិទ្យាសាស្ត្ររកឃើញភពថ្មីដែលអាចមានជីវិតរស់នៅបាន',
    summary: 'ការរកឃើញថ្មីរបស់អង្គការ NASA បង្ហាញពីភពមួយដែលមានលក្ខខណ្ឌស្រដៀងនឹងផែនដី។',
    content: 'ក្រុមអ្នកវិទ្យាសាស្ត្រអវកាសបានប្រកាសពីការរកឃើញភពថ្មីមួយដែលមានចម្ងាយប្រហែល ១០០ ឆ្នាំពន្លឺពីផែនដី។ ភពនេះស្ថិតនៅក្នុងតំបន់ដែលអាចរស់នៅបាន (Habitable Zone) ដែលមានសីតុណ្ហភាពសមស្របសម្រាប់ទឹក។ នេះគឺជាជំហានដ៏ធំមួយក្នុងការស្វែងរកជីវិតក្រៅភព។',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800',
    date: '៣០ នាទីមុន',
    author: 'Global Desk'
  },
  {
    id: 2,
    category: 'sports',
    source: 'Keila Daily',
    title: 'កម្ពុជាត្រៀមខ្លួនសម្រាប់ការប្រកួតកីឡាថ្នាក់ជាតិ',
    summary: 'ការរៀបចំសម្រាប់ការប្រកួតកីឡាជាតិលើកទី ៤ កំពុងដំណើរការយ៉ាងរលូន ដោយមានការចូលរួមពីអត្តពលិកទូទាំងប្រទេស។',
    content: 'ក្រសួងអប់រំ យុវជន និងកីឡា បានប្រកាសថា ការប្រកួតកីឡាជាតិលើកនេះនឹងមានលក្ខណៈពិសេសជាងរាល់ដង។ កីឡាករ និងកីឡាការិនីរាប់ពាន់នាក់មកពីគ្រប់រាជធានីខេត្ត នឹងមកជួបជុំគ្នានៅពហុកីឡដ្ឋានជាតិមរតកតេជោ។ នេះគឺជាឱកាសដ៏ល្អមួយដើម្បីវាស់ស្ទង់សមត្ថភាពកីឡាកររបស់យើង មុននឹងឈានទៅដល់ការប្រកួតកម្រិតអន្តរជាតិ។',
    image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&q=80&w=800',
    date: '៣ ម៉ោងមុន',
    author: 'ចាន់ ធីតា'
  }
];

// --- Components ---

const Header = ({ darkMode, setDarkMode, toggleSearch, toggleMenu, onOpenCreate }) => (
  <div className={`h-16 flex items-center justify-between px-4 border-b ${darkMode ? 'border-slate-700' : 'border-gray-100'}`}>
    <div className="flex items-center space-x-3">
      <button 
        onClick={toggleMenu}
        className={`p-2 rounded-full ${darkMode ? 'hover:bg-slate-800 text-white' : 'hover:bg-gray-100 text-gray-800'}`}
      >
        <Icons.Menu size={24} />
      </button>
      <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-['Kantumruy_Pro']">
        ព័ត៌មានខ្មែរ
      </h1>
    </div>
    <div className="flex items-center space-x-2">
      <button 
        onClick={onOpenCreate}
        className={`p-2 rounded-full ${darkMode ? 'hover:bg-slate-800 text-blue-400' : 'hover:bg-gray-100 text-blue-600'}`}
        title="បង្កើតអត្ថបទថ្មី"
      >
        <Icons.Plus size={22} />
      </button>
      <button 
        onClick={toggleSearch}
        className={`p-2 rounded-full ${darkMode ? 'hover:bg-slate-800 text-white' : 'hover:bg-gray-100 text-gray-600'}`}
      >
        <Icons.Search size={22} />
      </button>
      <button 
        onClick={() => setDarkMode(!darkMode)}
        className={`p-2 rounded-full ${darkMode ? 'bg-slate-800 text-yellow-400' : 'bg-gray-100 text-slate-700'}`}
      >
        {darkMode ? <Icons.Sun size={22} /> : <Icons.Moon size={22} />}
      </button>
    </div>
  </div>
);

const NewsTicker = ({ headlines, darkMode, onEdit }) => (
  <div className={`relative flex items-center h-10 overflow-hidden ${darkMode ? 'bg-slate-800' : 'bg-blue-50'} border-b ${darkMode ? 'border-slate-700' : 'border-blue-100'}`}>
    <div 
      className="z-20 flex items-center h-full px-3 md:px-4 bg-red-600 text-white shadow-md absolute left-0 top-0 cursor-pointer group hover:bg-red-700 transition-colors"
      onClick={onEdit}
      title="កែសម្រួលព័ត៌មានទាន់ហេតុការណ៍"
    >
      <div className="flex items-center space-x-2">
        <Icons.Bell size={16} className="animate-pulse" />
        <span className="font-['Kantumruy_Pro'] font-bold text-xs md:text-sm whitespace-nowrap">ទាន់ហេតុការណ៍</span>
        <Icons.Edit size={14} className="opacity-70 group-hover:opacity-100 transition-opacity" />
      </div>
      <div className="absolute right-0 top-0 h-full w-3 bg-red-600 transform translate-x-1/2 rotate-45 z-[-1] group-hover:bg-red-700 transition-colors"></div>
    </div>

    <div className="flex-1 overflow-hidden relative h-full ml-[130px] md:ml-[150px]">
      <div className="absolute top-0 h-full flex items-center whitespace-nowrap animate-marquee">
        {headlines.map((item, index) => (
          <span key={index} className={`mx-8 font-['Kantumruy_Pro'] text-sm ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            {item}
          </span>
        ))}
      </div>
    </div>
  </div>
);

const CategoryFilter = ({ activeCategory, setActiveCategory, darkMode }) => (
  <div className={`sticky top-16 z-40 shadow-sm transition-colors duration-300 ${darkMode ? 'bg-slate-900/95' : 'bg-white/95'} backdrop-blur-sm`}>
    <div className="max-w-4xl mx-auto px-4 py-3 overflow-x-auto no-scrollbar">
      <div className="flex space-x-3 min-w-max">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-4 py-1.5 rounded-full text-sm font-['Kantumruy_Pro'] font-medium transition-all ${
              activeCategory === cat.id
                ? 'bg-blue-600 text-white shadow-md shadow-blue-200'
                : darkMode 
                  ? 'bg-slate-800 text-slate-300 hover:bg-slate-700' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>
    </div>
  </div>
);

const UpdateTickerModal = ({ isOpen, onClose, newsItems, onUpdate, darkMode }) => {
  const [items, setItems] = useState(newsItems);
  const [newItem, setNewItem] = useState('');

  useEffect(() => {
    setItems(newsItems);
  }, [newsItems, isOpen]);

  if (!isOpen) return null;

  const handleAdd = (e) => {
    e.preventDefault();
    if (newItem.trim()) {
      setItems([...items, newItem.trim()]);
      setNewItem('');
    }
  };

  const handleRemove = (index) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
  };

  const handleSave = () => {
    onUpdate(items);
    onClose();
  };

  const inputClasses = `flex-1 px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 font-['Kantumruy_Pro'] ${
    darkMode 
      ? 'bg-slate-700 border-slate-600 text-white placeholder-slate-400' 
      : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400'
  }`;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4" onClick={onClose}>
      <div 
        className={`w-full max-w-lg rounded-2xl shadow-2xl relative animate-in fade-in zoom-in duration-200 flex flex-col max-h-[85vh] ${darkMode ? 'bg-slate-800 text-white' : 'bg-white text-gray-900'}`}
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-slate-700">
          <h3 className="text-xl font-bold font-['Kantumruy_Pro'] text-blue-600 dark:text-blue-400">កែសម្រួលព័ត៌មានទាន់ហេតុការណ៍</h3>
          <button onClick={onClose} className={`p-1 rounded-full ${darkMode ? 'hover:bg-slate-700' : 'hover:bg-gray-100'}`}>
            <Icons.X size={24} />
          </button>
        </div>

        <div className="p-4 overflow-y-auto flex-1">
          <form onSubmit={handleAdd} className="flex gap-2 mb-6">
            <input 
              type="text" 
              placeholder="បន្ថែមព័ត៌មានថ្មី..." 
              className={inputClasses}
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
            />
            <button type="submit" disabled={!newItem.trim()} className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white p-2 rounded-lg transition-colors">
              <Icons.Plus size={24} />
            </button>
          </form>

          <div className="space-y-3">
            {items.map((item, index) => (
              <div key={index} className={`flex items-start justify-between p-3 rounded-lg border ${darkMode ? 'bg-slate-700/50 border-slate-600' : 'bg-gray-50 border-gray-200'}`}>
                <p className="font-['Kantumruy_Pro'] text-sm mr-3 leading-relaxed">{item}</p>
                <button onClick={() => handleRemove(index)} className="text-red-500 hover:text-red-700 hover:bg-red-100 p-1.5 rounded-md transition-colors flex-shrink-0">
                  <Icons.Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="p-4 border-t border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800/50 rounded-b-2xl">
          <button onClick={handleSave} className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-xl shadow-sm flex items-center justify-center gap-2 transition-colors font-['Kantumruy_Pro']">
            <Icons.Save size={20} />
            <span>រក្សាទុកការផ្លាស់ប្តូរ</span>
          </button>
        </div>
      </div>
    </div>
  );
};

const CreatePostModal = ({ isOpen, onClose, onCreate, darkMode }) => {
  const [formData, setFormData] = useState({
    title: '',
    category: 'general',
    summary: '',
    content: '',
    image: '',
    source: '',
    author: '',
    salary: '',
    deadline: ''
  });

  const fileInputRef = useRef(null);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreate({
      ...formData,
      image: formData.image || 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&q=80&w=800',
      date: 'ទើបមិនហោះ'
    });
    onClose();
    setFormData({ title: '', category: 'general', summary: '', content: '', image: '', source: '', author: '', salary: '', deadline: '' });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const inputClasses = `w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 font-['Kantumruy_Pro'] ${
    darkMode ? 'bg-slate-700 border-slate-600 text-white placeholder-slate-400' : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400'
  }`;

  const isJobCategory = formData.category === 'jobs';

  return (
    <div className="fixed inset-0 z-[90] flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-sm p-4 sm:p-6" onClick={onClose}>
      <div className={`w-full max-w-2xl rounded-2xl shadow-2xl relative animate-in fade-in zoom-in duration-200 flex flex-col max-h-[90vh] ${darkMode ? 'bg-slate-800 text-white' : 'bg-white text-gray-900'}`} onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-slate-700">
          <h3 className="text-xl font-bold font-['Kantumruy_Pro'] text-blue-600 dark:text-blue-400">
            {isJobCategory ? 'ប្រកាសជ្រើសរើសបុគ្គលិក' : 'បង្កើតអត្ថបទថ្មី'}
          </h3>
          <button onClick={onClose} className={`p-1 rounded-full ${darkMode ? 'hover:bg-slate-700' : 'hover:bg-gray-100'}`}>
            <Icons.X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold mb-1 font-['Kantumruy_Pro']">ប្រភេទ</label>
              <select className={inputClasses} value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}>
                {categories.filter(c => c.id !== 'all' && c.id !== 'saved').map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold mb-1 font-['Kantumruy_Pro']">{isJobCategory ? 'តួនាទី / មុខតំណែង' : 'ចំណងជើង'}</label>
            <input type="text" required className={inputClasses} value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold mb-1 font-['Kantumruy_Pro']">{isJobCategory ? 'ឈ្មោះក្រុមហ៊ុន' : 'ប្រភព'}</label>
              <input type="text" required className={inputClasses} value={formData.source} onChange={e => setFormData({...formData, source: e.target.value})} />
            </div>
            
            {!isJobCategory && (
              <div>
                <label className="block text-sm font-bold mb-1 font-['Kantumruy_Pro']">អ្នកនិពន្ធ</label>
                <input type="text" required className={inputClasses} value={formData.author} onChange={e => setFormData({...formData, author: e.target.value})} />
              </div>
            )}
            
            {isJobCategory && (
              <div>
                <label className="block text-sm font-bold mb-1 font-['Kantumruy_Pro']">ប្រាក់ខែ (Salary)</label>
                <input type="text" className={inputClasses} value={formData.salary} onChange={e => setFormData({...formData, salary: e.target.value})} />
              </div>
            )}
          </div>

          {isJobCategory && (
            <div>
              <label className="block text-sm font-bold mb-1 font-['Kantumruy_Pro']">ថ្ងៃឈប់ទទួលពាក្យ</label>
              <input type="date" className={inputClasses} value={formData.deadline} onChange={e => setFormData({...formData, deadline: e.target.value})} />
            </div>
          )}

          <div>
            <label className="block text-sm font-bold mb-1 font-['Kantumruy_Pro']">រូបភាព (URL ឬ Upload)</label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Icons.Image size={20} className="absolute left-3 top-2.5 text-gray-400" />
                <input type="url" className={`${inputClasses} pl-10`} value={formData.image.startsWith('data:') ? '' : formData.image} onChange={e => setFormData({...formData, image: e.target.value})} disabled={formData.image.startsWith('data:')} />
              </div>
              <input type="file" ref={fileInputRef} onChange={handleImageUpload} className="hidden" accept="image/*" />
              <button type="button" onClick={() => fileInputRef.current.click()} className={`px-4 rounded-lg border font-['Kantumruy_Pro'] flex items-center gap-2 ${darkMode ? 'bg-slate-700 border-slate-600 hover:bg-slate-600' : 'bg-gray-100 border-gray-200 hover:bg-gray-200'}`}>
                <Icons.Upload size={20} />
              </button>
            </div>
            
            {formData.image && (
              <div className="mt-2 relative group w-fit">
                <img src={formData.image} alt="Preview" className="h-24 w-auto rounded-lg object-cover border border-gray-300" />
                <button type="button" onClick={() => setFormData({...formData, image: ''})} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-md opacity-0 group-hover:opacity-100 transition-opacity">
                  <Icons.X size={12} />
                </button>
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-bold mb-1 font-['Kantumruy_Pro']">{isJobCategory ? 'លក្ខខណ្ឌជ្រើសរើសសង្ខេប' : 'សេចក្តីសង្ខេប'}</label>
            <textarea rows="2" required className={inputClasses} value={formData.summary} onChange={e => setFormData({...formData, summary: e.target.value})} />
          </div>

          <div>
            <label className="block text-sm font-bold mb-1 font-['Kantumruy_Pro']">{isJobCategory ? 'ព័ត៌មានលម្អិតអំពីការងារ' : 'ខ្លឹមសារលម្អិត'}</label>
            <textarea rows="6" required className={inputClasses} value={formData.content} onChange={e => setFormData({...formData, content: e.target.value})} />
          </div>

          <div className="pt-2">
            <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl flex items-center justify-center space-x-2 transition-colors font-['Kantumruy_Pro']">
              <Icons.Send size={20} />
              <span>{isJobCategory ? 'ប្រកាសការងារ' : 'បង្ហោះអត្ថបទ'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const Sidebar = ({ isOpen, onClose, darkMode, categories, activeCategory, setActiveCategory, onOpenModal }) => {
  const sidebarClasses = `fixed top-0 left-0 h-full w-72 z-[70] transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'} ${darkMode ? 'bg-slate-900 text-white' : 'bg-white text-gray-900'} shadow-2xl`;
  const backdropClasses = `fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`;

  return (
    <>
      <div className={backdropClasses} onClick={onClose} />
      <div className={sidebarClasses}>
        <div className="p-4 flex items-center justify-between border-b border-gray-200 dark:border-slate-700 h-16">
          <h2 className="text-xl font-bold font-['Kantumruy_Pro'] text-blue-600">ម៉ឺនុយ</h2>
          <button onClick={onClose} className={`p-2 rounded-full ${darkMode ? 'hover:bg-slate-800' : 'hover:bg-gray-100'}`}>
            <Icons.X size={24} />
          </button>
        </div>

        <div className="p-4 overflow-y-auto h-[calc(100vh-64px)] flex flex-col justify-between">
          <div className="space-y-1">
             <p className={`text-xs font-bold uppercase tracking-wider mb-3 mt-2 font-['Kantumruy_Pro'] ${darkMode ? 'text-slate-500' : 'text-gray-500'}`}>ប្រភេទព័ត៌មាន</p>
             {categories.map(cat => (
               <button key={cat.id} onClick={() => { setActiveCategory(cat.id); onClose(); }} className={`w-full text-left px-4 py-3 rounded-lg font-['Kantumruy_Pro'] transition-colors flex items-center justify-between ${activeCategory === cat.id ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 font-bold' : darkMode ? 'hover:bg-slate-800' : 'hover:bg-gray-50'}`}>
                 <span>{cat.name}</span>
                 {activeCategory === cat.id && <div className="w-2 h-2 rounded-full bg-blue-500"></div>}
               </button>
             ))}
             <div className={`h-px my-6 ${darkMode ? 'bg-slate-800' : 'bg-gray-200'}`} />
             <p className={`text-xs font-bold uppercase tracking-wider mb-3 font-['Kantumruy_Pro'] ${darkMode ? 'text-slate-500' : 'text-gray-500'}`}>ផ្សេងៗ</p>
             <button onClick={() => { onOpenModal('about'); onClose(); }} className={`w-full text-left px-4 py-3 rounded-lg font-['Kantumruy_Pro'] ${darkMode ? 'hover:bg-slate-800' : 'hover:bg-gray-50'}`}>អំពីយើង</button>
             <button onClick={() => { onOpenModal('contact'); onClose(); }} className={`w-full text-left px-4 py-3 rounded-lg font-['Kantumruy_Pro'] ${darkMode ? 'hover:bg-slate-800' : 'hover:bg-gray-50'}`}>ទំនាក់ទំនង</button>
             <button onClick={() => { onOpenModal('policy'); onClose(); }} className={`w-full text-left px-4 py-3 rounded-lg font-['Kantumruy_Pro'] ${darkMode ? 'hover:bg-slate-800' : 'hover:bg-gray-50'}`}>គោលការណ៍ឯកជនភាព</button>
          </div>

          <div className="mt-8 pb-8">
            <p className={`text-xs font-bold uppercase tracking-wider mb-4 font-['Kantumruy_Pro'] ${darkMode ? 'text-slate-500' : 'text-gray-500'}`}>បណ្តាញសង្គម</p>
            <div className="flex items-center space-x-4">
              <a href="#" className={`p-2 rounded-full transition-colors ${darkMode ? 'hover:bg-slate-800 text-slate-400 hover:text-white' : 'hover:bg-gray-100 text-gray-500 hover:text-black'}`}><Icons.SocialX size={20} /></a>
              <a href="#" className={`p-2 rounded-full transition-colors ${darkMode ? 'hover:bg-slate-800 text-slate-400 hover:text-blue-500' : 'hover:bg-gray-100 text-gray-500 hover:text-blue-600'}`}><Icons.Facebook size={20} /></a>
              <a href="#" className={`p-2 rounded-full transition-colors ${darkMode ? 'hover:bg-slate-800 text-slate-400 hover:text-red-500' : 'hover:bg-gray-100 text-gray-500 hover:text-red-600'}`}><Icons.Youtube size={22} /></a>
              <a href="#" className={`p-2 rounded-full transition-colors ${darkMode ? 'hover:bg-slate-800 text-slate-400 hover:text-pink-500' : 'hover:bg-gray-100 text-gray-500 hover:text-pink-600'}`}><Icons.Tiktok size={20} /></a>
              <a href="#" className={`p-2 rounded-full transition-colors ${darkMode ? 'hover:bg-slate-800 text-slate-400 hover:text-blue-400' : 'hover:bg-gray-100 text-gray-500 hover:text-blue-500'}`}><Icons.Telegram size={22} /></a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const ArticleCard = ({ article, onClick, darkMode, isSaved, onToggleSave }) => (
  <div onClick={() => onClick(article)} className={`group cursor-pointer rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 relative ${darkMode ? 'bg-slate-800 border border-slate-700' : 'bg-white border border-gray-100'}`}>
    <button onClick={(e) => onToggleSave(e, article.id)} className={`absolute top-3 right-3 z-10 p-2 rounded-full shadow-md transition-colors ${isSaved ? 'bg-blue-600 text-white' : 'bg-white/80 text-gray-600 hover:bg-white'}`}>
      <Icons.Bookmark size={18} fill={isSaved ? "currentColor" : "none"} />
    </button>

    <div className="relative h-48 overflow-hidden">
      <img src={article.image} alt={article.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
      <div className="absolute top-3 left-3 bg-blue-600 text-white text-xs font-['Kantumruy_Pro'] px-2 py-1 rounded-md shadow-sm">
        {categories.find(c => c.id === article.category)?.name}
      </div>
      
      {article.category === 'jobs' && (
        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 to-transparent p-3 pt-8">
           <div className="flex items-center text-white text-xs font-['Kantumruy_Pro'] space-x-3">
              {article.salary && <div className="flex items-center font-bold text-green-300"><Icons.DollarSign size={14} className="mr-0.5" />{article.salary}</div>}
              {article.deadline && <div className="flex items-center text-red-200"><Icons.Calendar size={14} className="mr-0.5" />{article.deadline}</div>}
           </div>
        </div>
      )}
    </div>
    <div className="p-4">
      <div className={`flex items-center justify-between text-xs mb-3 ${darkMode ? 'text-slate-400' : 'text-gray-500'}`}>
        <div className="flex items-center">
          {article.category === 'jobs' ? <Icons.Briefcase size={12} className="mr-1" /> : <Icons.Clock size={12} className="mr-1" />}
          <span className="font-['Kantumruy_Pro']">{article.date}</span>
        </div>
        <div className="flex items-center text-blue-500 font-bold font-['Kantumruy_Pro']">
          <Icons.Globe size={12} className="mr-1" />
          {article.source}
        </div>
      </div>
      <h3 className={`text-lg font-bold font-['Kantumruy_Pro'] leading-snug mb-2 line-clamp-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{article.title}</h3>
      <p className={`text-sm font-['Kantumruy_Pro'] line-clamp-2 ${darkMode ? 'text-slate-300' : 'text-gray-600'}`}>{article.summary}</p>
    </div>
  </div>
);

const ArticleDetail = ({ article, onBack, darkMode, isSaved, onToggleSave }) => (
  <div className={`min-h-screen ${darkMode ? 'bg-slate-900 text-white' : 'bg-white text-gray-900'} font-['Kantumruy_Pro'] pb-20`}>
    <div className={`fixed top-0 left-0 w-full z-50 px-4 h-16 flex items-center justify-between ${darkMode ? 'bg-slate-900/90' : 'bg-white/90'} backdrop-blur-md shadow-sm`}>
      <button onClick={onBack} className={`p-2 rounded-full ${darkMode ? 'hover:bg-slate-800' : 'hover:bg-gray-100'}`}><Icons.ChevronLeft size={28} /></button>
      <div className="flex space-x-4">
        <button onClick={(e) => onToggleSave(e, article.id)} className={`p-2 rounded-full transition-colors ${isSaved ? 'text-blue-600 bg-blue-50' : darkMode ? 'text-slate-300 hover:bg-slate-800' : 'text-gray-600 hover:bg-gray-100'}`}>
          <Icons.Bookmark size={24} fill={isSaved ? "currentColor" : "none"}/>
        </button>
        <button className={darkMode ? 'text-slate-300' : 'text-gray-600'}><Icons.Share2 size={24}/></button>
      </div>
    </div>

    <div className="max-w-3xl mx-auto pt-20 px-4">
      <span className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold mb-4">{categories.find(c => c.id === article.category)?.name}</span>
      <h1 className="text-2xl md:text-4xl font-bold leading-tight mb-6">{article.title}</h1>

      {article.category === 'jobs' && (
        <div className={`mb-6 p-4 rounded-xl border ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-blue-50 border-blue-100'}`}>
          <div className="grid grid-cols-2 gap-4">
            <div><p className={`text-xs ${darkMode ? 'text-slate-400' : 'text-gray-500'} mb-1`}>ប្រាក់ខែ</p><p className="font-bold text-green-600 text-lg flex items-center"><Icons.DollarSign size={18} className="mr-1"/> {article.salary || 'Negotiable'}</p></div>
            <div><p className={`text-xs ${darkMode ? 'text-slate-400' : 'text-gray-500'} mb-1`}>ថ្ងៃឈប់ទទួលពាក្យ</p><p className="font-bold text-red-500 text-lg flex items-center"><Icons.Calendar size={18} className="mr-1"/> {article.deadline || 'N/A'}</p></div>
          </div>
        </div>
      )}

      <div className="flex items-center mb-6 border-b pb-6 border-gray-200 dark:border-slate-700">
        <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold text-xl mr-3 shadow-md">{article.source.charAt(0)}</div>
        <div className="flex-1">
          <p className="font-bold text-base text-blue-600 dark:text-blue-400">{article.source}</p>
          <div className={`flex items-center text-xs ${darkMode ? 'text-slate-400' : 'text-gray-500'} mt-0.5`}>
            {article.category !== 'jobs' && <span>{article.author}</span>}
            {article.category !== 'jobs' && <span className="mx-2">•</span>}
            <span>{article.date}</span>
          </div>
        </div>
      </div>

      <div className="rounded-xl overflow-hidden mb-8 shadow-md">
        <img src={article.image} alt={article.title} className="w-full h-auto object-cover" />
        <p className={`text-xs text-right mt-2 italic ${darkMode ? 'text-slate-500' : 'text-gray-400'}`}>រូបភាពដោយ៖ {article.source}</p>
      </div>

      <div className={`prose max-w-none text-lg leading-loose ${darkMode ? 'prose-invert text-slate-300' : 'text-gray-800'}`}>
        {article.content.split('\n').map((paragraph, idx) => (<p key={idx} className="mb-4">{paragraph}</p>))}
      </div>
      
      {article.category === 'jobs' && (
        <div className="mt-8 sticky bottom-4">
           <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg transition-transform transform active:scale-95 flex items-center justify-center gap-2">
             <Icons.Send size={20} />
             ដាក់ពាក្យឥឡូវនេះ
           </button>
        </div>
      )}
    </div>
  </div>
);

const InfoModal = ({ isOpen, onClose, title, content, darkMode }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center px-4 bg-black/50 backdrop-blur-sm" onClick={onClose}>
      <div className={`w-full max-w-md rounded-2xl p-6 shadow-2xl relative animate-in fade-in zoom-in duration-200 ${darkMode ? 'bg-slate-800 text-white' : 'bg-white text-gray-900'}`} onClick={e => e.stopPropagation()}>
        <button onClick={onClose} className={`absolute top-4 right-4 p-1 rounded-full ${darkMode ? 'hover:bg-slate-700' : 'hover:bg-gray-100'}`}><Icons.X size={20} /></button>
        <h3 className="text-xl font-bold font-['Kantumruy_Pro'] mb-4 text-blue-600 dark:text-blue-400">{title}</h3>
        <div className="font-['Kantumruy_Pro'] text-sm leading-relaxed opacity-90">{content}</div>
      </div>
    </div>
  );
};

// --- Main App Component ---
export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [savedIds, setSavedIds] = useState([]);
  const [activeModal, setActiveModal] = useState(null);
  
  const [newsItems, setNewsItems] = useState(initialNews);
  const [breakingNewsItems, setBreakingNewsItems] = useState(defaultBreakingNews);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isTickerModalOpen, setIsTickerModalOpen] = useState(false);

  const toKhmerNum = (num) => num.toString().replace(/\d/g, (d) => ['០', '១', '២', '៣', '៤', '៥', '៦', '៧', '៨', '៩'][d]);

  const modalContent = {
    about: { title: 'អំពីយើង', content: <div className="space-y-4"><p>កម្មវិធីព័ត៌មានខ្មែរ គឺជាប្រភពព័ត៌មានដែលបង្កើតឡើងដើម្បីផ្តល់ជូននូវព័ត៌មានថ្មីៗ ទាន់ហេតុការណ៍ និងប្រកបដោយវិជ្ជាជីវៈ។</p></div> },
    contact: { title: 'ទំនាក់ទំនង', content: <div className="space-y-3"><p>ទំនាក់ទំនងមកយើងខ្ញុំបានតាមរយៈ៖</p><ul className="list-none space-y-2 mt-2"><li className="flex items-center"><span className="font-bold w-20">អ៊ីមែល:</span> support@khmernews.app</li><li className="flex items-center"><span className="font-bold w-20">ទូរស័ព្ទ:</span> 012 999 999</li></ul></div> },
    policy: { title: 'គោលការណ៍ឯកជនភាព', content: <div className="space-y-4"><p>យើងគោរពសិទ្ធិឯកជនរបស់អ្នកប្រើប្រាស់ជាចម្បង។</p></div> }
  };

  const toggleSave = (e, id) => { e.stopPropagation(); setSavedIds(prev => prev.includes(id) ? prev.filter(sid => sid !== id) : [...prev, id]); };
  const handleCreatePost = (newPost) => setNewsItems([{ ...newPost, id: Date.now() }, ...newsItems]);
  const handleUpdateTicker = (newItems) => setBreakingNewsItems(newItems);

  const filteredNews = activeCategory === 'all' ? newsItems : activeCategory === 'saved' ? newsItems.filter(n => savedIds.includes(n.id)) : newsItems.filter(n => n.category === activeCategory);

  useEffect(() => { window.scrollTo(0, 0); }, [activeCategory, selectedArticle]);

  if (selectedArticle) return <ArticleDetail article={selectedArticle} onBack={() => setSelectedArticle(null)} darkMode={darkMode} isSaved={savedIds.includes(selectedArticle.id)} onToggleSave={toggleSave} />;

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-slate-950' : 'bg-slate-50'}`}>
      <Sidebar isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} darkMode={darkMode} categories={categories} activeCategory={activeCategory} setActiveCategory={setActiveCategory} onOpenModal={setActiveModal} />
      
      <div className="sticky top-0 z-50 bg-white dark:bg-slate-900 shadow-md transition-colors duration-300">
        <Header darkMode={darkMode} setDarkMode={setDarkMode} toggleSearch={() => setIsSearchOpen(!isSearchOpen)} toggleMenu={() => setIsMenuOpen(true)} onOpenCreate={() => setIsCreateModalOpen(true)} />
        <NewsTicker headlines={breakingNewsItems} darkMode={darkMode} onEdit={() => setIsTickerModalOpen(true)} />
        {isSearchOpen && (
          <div className={`p-4 ${darkMode ? 'bg-slate-900' : 'bg-white'} shadow-inner border-t border-gray-100 dark:border-slate-700`}>
            <div className="relative max-w-4xl mx-auto">
              <Icons.Search className="absolute left-3 top-3 text-gray-400" size={20} />
              <input type="text" placeholder="ស្វែងរកព័ត៌មាន..." className={`w-full pl-10 pr-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 font-['Kantumruy_Pro'] ${darkMode ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-500' : 'bg-gray-100 border-gray-200 text-gray-900'}`} />
            </div>
          </div>
        )}
        <CategoryFilter activeCategory={activeCategory} setActiveCategory={setActiveCategory} darkMode={darkMode} />
      </div>

      <main className="max-w-4xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className={`text-xl font-bold font-['Kantumruy_Pro'] ${darkMode ? 'text-white' : 'text-gray-800'}`}>{activeCategory === 'all' ? 'ព័ត៌មានថ្មីៗ' : activeCategory === 'saved' ? 'អត្ថបទដែលបានរក្សាទុក' : categories.find(c => c.id === activeCategory)?.name}</h2>
          {activeCategory === 'all' && <button className={`text-sm font-['Kantumruy_Pro'] ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>មើលទាំងអស់</button>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNews.map((news) => (
            <ArticleCard key={news.id} article={news} onClick={setSelectedArticle} darkMode={darkMode} isSaved={savedIds.includes(news.id)} onToggleSave={toggleSave} />
          ))}
        </div>

        {filteredNews.length === 0 && (
          <div className="text-center py-20">
            <p className={`text-lg font-['Kantumruy_Pro'] ${darkMode ? 'text-slate-500' : 'text-gray-400'}`}>មិនមានព័ត៌មាននៅក្នុងផ្នែកនេះទេ</p>
          </div>
        )}
      </main>

      <footer className={`py-8 mt-10 border-t ${darkMode ? 'bg-slate-900 border-slate-800 text-slate-400' : 'bg-white border-gray-200 text-gray-600'}`}>
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="flex justify-center space-x-6 text-sm font-['Kantumruy_Pro'] mb-6">
            <button onClick={() => setActiveModal('about')} className="hover:text-blue-500 transition-colors">អំពីយើង</button>
            <button onClick={() => setActiveModal('contact')} className="hover:text-blue-500 transition-colors">ទំនាក់ទំនង</button>
            <button onClick={() => setActiveModal('policy')} className="hover:text-blue-500 transition-colors">គោលការណ៍</button>
          </div>
          <div className="flex justify-center space-x-4 mb-6">
            <a href="#" className={`p-2 rounded-full transition-colors ${darkMode ? 'hover:bg-slate-800 text-slate-400 hover:text-white' : 'hover:bg-gray-100 text-gray-500 hover:text-black'}`}><Icons.SocialX size={20} /></a>
            <a href="#" className={`p-2 rounded-full transition-colors ${darkMode ? 'hover:bg-slate-800 text-slate-400 hover:text-blue-500' : 'hover:bg-gray-100 text-gray-500 hover:text-blue-600'}`}><Icons.Facebook size={20} /></a>
            <a href="#" className={`p-2 rounded-full transition-colors ${darkMode ? 'hover:bg-slate-800 text-slate-400 hover:text-red-500' : 'hover:bg-gray-100 text-gray-500 hover:text-red-600'}`}><Icons.Youtube size={22} /></a>
            <a href="#" className={`p-2 rounded-full transition-colors ${darkMode ? 'hover:bg-slate-800 text-slate-400 hover:text-pink-500' : 'hover:bg-gray-100 text-gray-500 hover:text-pink-600'}`}><Icons.Tiktok size={20} /></a>
            <a href="#" className={`p-2 rounded-full transition-colors ${darkMode ? 'hover:bg-slate-800 text-slate-400 hover:text-blue-400' : 'hover:bg-gray-100 text-gray-500 hover:text-blue-500'}`}><Icons.Telegram size={22} /></a>
          </div>
          <p className="font-['Kantumruy_Pro'] text-xs opacity-75">© {toKhmerNum(new Date().getFullYear())} កម្មវិធីព័ត៌មានខ្មែរ. រក្សាសិទ្ធិគ្រប់យ៉ាង.</p>
        </div>
      </footer>

      <InfoModal isOpen={!!activeModal} onClose={() => setActiveModal(null)} title={activeModal ? modalContent[activeModal].title : ''} content={activeModal ? modalContent[activeModal].content : ''} darkMode={darkMode} />
      <CreatePostModal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} onCreate={handleCreatePost} darkMode={darkMode} />
      <UpdateTickerModal isOpen={isTickerModalOpen} onClose={() => setIsTickerModalOpen(false)} newsItems={breakingNewsItems} onUpdate={handleUpdateTicker} darkMode={darkMode} />
    </div>
  );
}



