
import React, { useEffect, useRef } from "react";
import { Student } from "../types/student";
import { Facebook, X } from "lucide-react";

interface StudentModalProps {
  student: Student | null;
  isOpen: boolean;
  onClose: () => void;
}

const StudentModal: React.FC<StudentModalProps> = ({ student, isOpen, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !contentRef.current?.contains(event.target as Node)) {
        onClose();
      }
    };

    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscKey);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!student) return null;

  return (
    <div
      ref={modalRef}
      className={`fixed inset-0 z-50 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      aria-modal="true"
      role="dialog"
    >
      <div
        ref={contentRef}
        className={`slide-up-container fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-indigo-500/30 rounded-t-3xl shadow-2xl overflow-hidden md:max-w-4xl md:mx-auto ${
          isOpen ? "active" : ""
        }`}
      >
        <div className="absolute top-0 left-0 right-0 h-1">
          <div className="w-12 h-1 bg-gray-600 rounded-full mx-auto mt-3"></div>
        </div>
        
        <div className="relative p-6 md:p-8 pt-12 max-h-[calc(75vh-2rem)] overflow-y-auto">
          <button
            onClick={onClose}
            className="absolute right-6 md:right-8 top-6 md:top-8 p-2 rounded-full bg-gray-800 hover:bg-gray-700 border border-gray-700 transition-colors"
            aria-label="Close modal"
          >
            <X className="h-4 w-4 text-gray-400" />
          </button>

          <div className="flex flex-col gap-6 items-start">
            <div className="w-full">
              <h2 className="text-2xl md:text-3xl font-semibold mb-2 text-white bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">{student.name}</h2>
              
              {student.honors && (
                <div className="mb-6">
                  <span className="inline-block px-3 py-1 bg-indigo-500/20 text-indigo-300 rounded-full text-sm font-medium">
                    {student.honors}
                  </span>
                </div>
              )}

              {student.achievements.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg md:text-xl font-medium mb-3 text-gray-200">Achievements</h3>
                  <div className="max-h-[40vh] pr-2 overflow-y-auto scrollbar-thin">
                    <ul className="space-y-2 grid grid-cols-1 md:grid-cols-2 gap-3">
                      {student.achievements.map((achievement, index) => (
                        <li key={index} className="flex items-start p-2 rounded-lg bg-gray-800/50 hover:bg-gray-800 transition-colors">
                          <span className="h-2 w-2 rounded-full bg-indigo-400 mr-2 mt-2 flex-shrink-0"></span>
                          <span className="text-gray-300 flex-1">
                            {achievement.name}, <span className="text-indigo-300">{achievement.year}</span>
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              <div className="flex justify-start mt-4 space-x-3">
                <a
                  href={student.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors border border-indigo-500"
                >
                  <Facebook className="h-4 w-4" />
                  <span>Facebook Profile</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentModal;
