import React, { useEffect } from "react";
import { X } from "lucide-react";
import Image from "next/image";

type ModalContentId =
  | "character"
  | "where-i-live"
  | "places-to-go"
  | "brain-dump"
  | "books"
  | "contacts"
  | null;

interface NotebookModalProps {
  isOpen: boolean;
  onClose: () => void;
  contentId: ModalContentId;
}

export function NotebookModal({ isOpen, onClose, contentId }: NotebookModalProps) {
  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen || !contentId) return null;

  const renderContent = () => {
    switch (contentId) {
      case "character":
        return (
          <div className="flex flex-col h-full font-serif text-ink">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 font-mono border-b-4 border-ink pb-2 inline-block self-start">
              About Me
            </h2>
            <p className="text-lg md:text-2xl leading-loose mb-6">
              I'm <strong className="font-bold">Kanaka</strong> and I'm the curator of <strong className="font-bold">kanaka.pages</strong>.
              I'm a writer and observer who loves building worlds and telling stories, both Goan and universal!
            </p>
            <p className="text-lg md:text-2xl leading-loose">
              I'm a devoted friend (often over-analyzing everything), and almost everything I own is stained with ink or sand.
            </p>
            <div className="mt-auto pt-8">
              <h2 className="text-5xl text-ink -rotate-2" style={{ fontFamily: "'Brush Script MT', 'Dancing Script', cursive" }}>
                Kanaka
              </h2>
            </div>
          </div>
        );
      case "where-i-live":
        return (
          <div className="flex flex-col h-full text-ink font-serif">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 font-mono border-b-4 border-ink pb-2 inline-block self-start">
              Where I Live
            </h2>
            <div className="w-full h-48 md:h-64 relative border-4 border-ink brutal-shadow mb-6 bg-white overflow-hidden -rotate-1">
              <Image 
                src="/hero/kanaka-goa-scenery.png" 
                alt="Goa Scenery" 
                fill
                className="object-cover"
              />
            </div>
            <p className="text-lg md:text-2xl leading-loose">
              I'm based in sunny <strong className="font-bold">Goa</strong>! A place where the sea breeze meets deep-rooted history, inspiring every word I write. 
            </p>
          </div>
        );
      case "places-to-go":
        return (
          <div className="flex flex-col h-full text-ink font-mono">
            <h2 className="text-3xl md:text-5xl font-bold mb-8 border-b-4 border-ink pb-2 inline-block self-start">
              Travel Checklist
            </h2>
            <div className="flex flex-col gap-4 text-xl md:text-2xl">
              <label className="flex items-center gap-4 cursor-pointer">
                <input type="checkbox" defaultChecked className="w-6 h-6 border-4 border-ink accent-ink" />
                <span className="line-through decoration-4 decoration-red-500">Hampi Ruins</span>
              </label>
              <label className="flex items-center gap-4 cursor-pointer">
                <input type="checkbox" className="w-6 h-6 border-4 border-ink accent-ink" />
                <span>Gokarna Beaches</span>
              </label>
              <label className="flex items-center gap-4 cursor-pointer">
                <input type="checkbox" className="w-6 h-6 border-4 border-ink accent-ink" />
                <span>Jaipur Palaces</span>
              </label>
              <label className="flex items-center gap-4 cursor-pointer">
                <input type="checkbox" className="w-6 h-6 border-4 border-ink accent-ink" />
                <span>Pondicherry Cafes</span>
              </label>
              <label className="flex items-center gap-4 cursor-pointer">
                <input type="checkbox" className="w-6 h-6 border-4 border-ink accent-ink" />
                <span>Himalayan Trek</span>
              </label>
            </div>
          </div>
        );
      case "brain-dump":
        return (
          <div className="flex flex-col h-full text-ink">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 font-mono border-b-4 border-ink pb-2 inline-block self-start">
              Brain Dump
            </h2>
            <ul className="list-disc pl-8 flex flex-col gap-4 text-xl md:text-2xl font-serif leading-loose">
              <li>Drafting the "Coastal Legends" chapter. Need more research on local folklore.</li>
              <li>Idea: A short story about a writer whose pen brings drawings to life.</li>
              <li>Remember to pick up more ink cartridges from the stationery shop!</li>
              <li>Blog post: "Why I wear too many floral prints."</li>
            </ul>
          </div>
        );
      case "books":
        return (
          <div className="flex flex-col h-full text-ink">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 font-mono border-b-4 border-ink pb-2 inline-block self-start">
              Books I've Read
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="bg-yellow-200 border-4 border-ink p-4 brutal-shadow-sm rotate-1">
                <h3 className="font-bold text-xl font-mono">The God of Small Things</h3>
                <p className="text-sm font-serif mt-1">Arundhati Roy</p>
              </div>
              <div className="bg-pink-200 border-4 border-ink p-4 brutal-shadow-sm -rotate-2">
                <h3 className="font-bold text-xl font-mono">Midnight's Children</h3>
                <p className="text-sm font-serif mt-1">Salman Rushdie</p>
              </div>
              <div className="bg-green-200 border-4 border-ink p-4 brutal-shadow-sm rotate-2">
                <h3 className="font-bold text-xl font-mono">Sea of Poppies</h3>
                <p className="text-sm font-serif mt-1">Amitav Ghosh</p>
              </div>
              <div className="bg-blue-200 border-4 border-ink p-4 brutal-shadow-sm -rotate-1">
                <h3 className="font-bold text-xl font-mono">Interpreter of Maladies</h3>
                <p className="text-sm font-serif mt-1">Jhumpa Lahiri</p>
              </div>
            </div>
          </div>
        );
      case "contacts":
        return (
          <div className="flex flex-col h-full text-ink font-mono">
            <h2 className="text-3xl md:text-5xl font-bold mb-8 border-b-4 border-ink pb-2 inline-block self-start">
              My Contacts
            </h2>
            <div className="flex flex-col gap-6 text-xl md:text-2xl">
              <a href="#" className="flex items-center gap-4 hover:translate-x-2 transition-transform">
                <div className="w-12 h-12 bg-black text-white flex items-center justify-center border-2 border-ink brutal-shadow-sm rounded-full">
                  𝕏
                </div>
                <span>@kanaka_pages</span>
              </a>
              <a href="#" className="flex items-center gap-4 hover:translate-x-2 transition-transform">
                <div className="w-12 h-12 bg-pink-500 text-white flex items-center justify-center border-2 border-ink brutal-shadow-sm rounded-full">
                  Ig
                </div>
                <span>@kanaka.writes</span>
              </a>
              <a href="#" className="flex items-center gap-4 hover:translate-x-2 transition-transform">
                <div className="w-12 h-12 bg-blue-600 text-white flex items-center justify-center border-2 border-ink brutal-shadow-sm rounded-full">
                  In
                </div>
                <span>Kanaka Prabhu</span>
              </a>
              <a href="#" className="flex items-center gap-4 hover:translate-x-2 transition-transform">
                <div className="w-12 h-12 bg-yellow-400 text-ink flex items-center justify-center border-2 border-ink brutal-shadow-sm rounded-full">
                  @
                </div>
                <span>hello@kanaka.pages</span>
              </a>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-12 md:pt-24">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-ink/60 backdrop-blur-sm cursor-pointer"
        onClick={onClose}
      />
      
      {/* Notebook Container */}
      <div 
        className="relative w-full max-w-3xl h-[75vh] md:h-[80vh] mt-8 md:mt-12 bg-[#fbf8f1] border-[6px] border-ink brutal-shadow-lg flex flex-col md:flex-row z-10 rotate-1 animate-in fade-in zoom-in duration-200"
      >
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute -top-4 -right-4 w-12 h-12 bg-red-500 border-4 border-ink brutal-shadow-sm flex items-center justify-center hover:scale-110 hover:rotate-12 transition-transform z-20"
        >
          <X size={24} strokeWidth={4} className="text-white" />
        </button>

        {/* Notebook Spine (Spiral Binding) */}
        <div className="hidden md:flex flex-col justify-evenly h-full w-12 bg-ink/5 border-r-4 border-ink z-10 absolute left-0">
           {[...Array(15)].map((_, i) => (
             <div key={i} className="w-16 h-4 bg-ink/80 rounded-full border-2 border-ink brutal-shadow-sm -ml-2" />
           ))}
        </div>

        {/* Mobile Binding (Top) */}
        <div className="md:hidden flex flex-row justify-evenly w-full h-10 bg-ink/5 border-b-4 border-ink z-10">
           {[...Array(8)].map((_, i) => (
             <div key={i} className="w-4 h-12 bg-ink/80 rounded-full border-2 border-ink brutal-shadow-sm -mt-2" />
           ))}
        </div>

        {/* Page Content area with ruled lines */}
        <div className="flex-1 h-full relative overflow-y-auto overflow-x-hidden md:ml-12 custom-scrollbar">
          {/* Ruled lines background */}
          <div 
            className="absolute inset-0 pointer-events-none opacity-40 z-0"
            style={{
              backgroundImage: "repeating-linear-gradient(transparent, transparent 39px, #94a3b8 39px, #94a3b8 40px)",
              backgroundSize: "100% 40px",
              backgroundPosition: "0 0"
            }}
          />
          {/* Vertical red margin line */}
          <div className="absolute left-10 md:left-12 top-0 bottom-0 w-1 bg-red-400/50 pointer-events-none z-0" />
          
          {/* Actual Content */}
          <div className="relative z-10 p-8 md:p-12 md:pl-20 min-h-full">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
}
