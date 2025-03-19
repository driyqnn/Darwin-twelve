
import React from "react";
import { Student } from "../types/student";

interface StudentCardProps {
  student: Student;
  onClick: () => void;
  index: number;
}

const StudentCard: React.FC<StudentCardProps> = ({ student, onClick, index }) => {
  return (
    <div 
      className="animate-fade-in opacity-0" 
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div 
        onClick={onClick}
        className="relative aspect-[2/3] rounded-lg overflow-hidden cursor-pointer group transition-all duration-300 hover:scale-[1.03] border border-gray-800"
      >
        <img 
          src={student.photo} 
          alt={student.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/90 via-purple-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
          <h3 className="text-white font-medium text-lg">{student.name}</h3>
          {student.honors && (
            <span className="text-indigo-200 text-sm">{student.honors}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentCard;
