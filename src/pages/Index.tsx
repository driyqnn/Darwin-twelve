import React, { useState, useEffect, useMemo } from "react";
import StudentCard from "../components/StudentCard";
import StudentModal from "../components/StudentModal";
import { Student } from "../types/student";
import ThemeToggle from "../components/ThemeToggle";
import Footer from "../components/Footer";
import studentsData from "../data/students.json";
import { Search, ArrowUpDown } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { ThemeProvider } from "../context/ThemeContext";

const Index = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredStudents, setFilteredStudents] = useState<Student[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sortingOption, setSortingOption] = useState<string>("default");

  // Initialize students sorted by surname
  useEffect(() => {
    const sortedStudents = [...studentsData].sort((a, b) =>
      a.surname.localeCompare(b.surname)
    );
    setStudents(sortedStudents);
    setFilteredStudents(sortedStudents);
  }, []);

  // Apply search and sorting whenever query or sorting option changes
  useEffect(() => {
    let results = [...students];

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      results = results.filter(
        (student) =>
          student.name.toLowerCase().includes(query) ||
          student.surname.toLowerCase().includes(query) ||
          student.honors.toLowerCase().includes(query)
      );
    }

    // Apply sorting
    switch (sortingOption) {
      case "default":
        results.sort((a, b) => a.surname.localeCompare(b.surname));
        break;
      case "achievements":
        results.sort((a, b) => b.achievements.length - a.achievements.length);
        break;
      case "gender":
        results.sort((a, b) => {
          // Assuming gender is male/female, sort alphabetically by gender
          const genderA = a.gender?.toLowerCase() || "unknown";
          const genderB = b.gender?.toLowerCase() || "unknown";
          return genderA.localeCompare(genderB);
        });
        break;
      default:
        break;
    }

    setFilteredStudents(results);
  }, [searchQuery, sortingOption, students]);

  const handleStudentClick = (student: Student) => {
    setSelectedStudent(student);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => {
      setSelectedStudent(null);
    }, 300); // Wait for the close animation
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gray-900 dark:bg-[#121212] pt-8 pb-16 transition-colors duration-300 flex flex-col">
        <div className="app-content relative flex-grow">
          <ThemeToggle />

          <div className="mb-8">
            <h1 className="text-4xl font-bold text-center text-gray-100 mb-2 bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
              Darwin 12 Graduates 2024
            </h1>
            <p className="text-center text-gray-400 mb-8">
              Celebrating Excellence and Achievement
            </p>

            {/* Search and Sorting */}
            <div className="flex flex-col md:flex-row gap-4 mb-8 max-w-3xl mx-auto">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-5 w-5 text-indigo-300" />
                <input
                  type="text"
                  placeholder="Search by name or honors..."
                  className="search-input pl-10 bg-gray-800 border-gray-700 text-gray-200 placeholder-gray-500 focus:ring-indigo-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="w-56">
                {/* Sorting Options */}
                <Select value={sortingOption} onValueChange={setSortingOption}>
                  <SelectTrigger className="filter-select bg-gray-800 border-gray-700 text-gray-200">
                    <ArrowUpDown className="h-4 w-4 mr-2 text-indigo-300" />
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700 text-gray-200">
                    <SelectItem value="default" className="focus:bg-indigo-600">
                      Default (By Surname)
                    </SelectItem>
                    <SelectItem
                      value="achievements"
                      className="focus:bg-indigo-600">
                      By Number of Achievements
                    </SelectItem>
                    <SelectItem value="gender" className="focus:bg-indigo-600">
                      By Gender
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Display filter information */}
            {filteredStudents.length === 0 ? (
              <div className="text-center mt-8">
                <p className="text-gray-400">
                  No students found matching your search.
                </p>
              </div>
            ) : filteredStudents.length !== students.length ? (
              <div className="text-center mt-2 mb-4">
                <p className="text-sm text-gray-400">
                  Displaying {filteredStudents.length} of {students.length}{" "}
                  students
                </p>
              </div>
            ) : null}
          </div>

          {/* Student Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
            {filteredStudents.map((student, index) => (
              <StudentCard
                key={student.id}
                student={student}
                onClick={() => handleStudentClick(student)}
                index={index}
              />
            ))}
          </div>
        </div>

        {/* Footer */}
        <Footer />

        {/* Student Detail Modal */}
        <StudentModal
          student={selectedStudent}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      </div>
    </ThemeProvider>
  );
};

export default Index;
