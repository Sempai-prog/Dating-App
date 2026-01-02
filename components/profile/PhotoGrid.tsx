import React from 'react';
import { Plus, X, Star } from 'lucide-react';

interface PhotoGridProps {
  photos: string[];
  onChange: (newPhotos: string[]) => void;
}

export const PhotoGrid: React.FC<PhotoGridProps> = ({ photos, onChange }) => {
  const MAX_SLOTS = 6;
  
  const handleAddPhoto = () => {
    // Simulate upload by adding a random placeholder
    const placeholders = [
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=600&h=800&fit=crop",
      "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=600&h=800&fit=crop",
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=600&h=800&fit=crop"
    ];
    const random = placeholders[Math.floor(Math.random() * placeholders.length)];
    onChange([...photos, random]);
  };

  const handleRemovePhoto = (index: number) => {
    const newPhotos = photos.filter((_, i) => i !== index);
    onChange(newPhotos);
  };

  return (
    <div className="grid grid-cols-3 gap-3">
      {Array.from({ length: MAX_SLOTS }).map((_, index) => {
        const photo = photos[index];
        const isMain = index === 0;

        return (
          <div 
            key={index} 
            className={`aspect-[2/3] relative rounded-xl overflow-hidden border transition-all duration-300 group ${
              photo 
                ? 'border-transparent bg-zinc-900' 
                : 'border-white/10 bg-white/5 border-dashed hover:border-brand-pink/50 hover:bg-white/10'
            }`}
          >
            {photo ? (
              <>
                <img src={photo} alt={`Slot ${index}`} className="w-full h-full object-cover" />
                
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />

                {/* Actions */}
                <button 
                  onClick={() => handleRemovePhoto(index)}
                  className="absolute top-2 right-2 p-1 bg-black/50 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500"
                >
                  <X size={14} />
                </button>

                {isMain && (
                  <div className="absolute bottom-2 left-2 bg-brand-pink text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-lg">
                    <Star size={10} fill="currentColor" />
                    MAIN
                  </div>
                )}
              </>
            ) : (
              <button 
                onClick={handleAddPhoto}
                className="w-full h-full flex items-center justify-center text-zinc-500 hover:text-brand-pink transition-colors"
                disabled={!!photos[MAX_SLOTS]} // Disable if full (though logic above handles it by loop)
              >
                <Plus size={24} />
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
};