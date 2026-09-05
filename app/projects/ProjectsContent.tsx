"use client";

import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";

type Project = {
  id: string;
  title: string;
  category: string;
  image: string;
  images: string[];
  desc: string;
  order: number;
};

type ProjectsContentProps = {
  projects: Project[];
  projectsAr?: Project[];
  sc: Record<string, string>;
  scAr?: Record<string, string>;
};

export default function ProjectsContent({ projects: dbProjectsEn, projectsAr: dbProjectsAr, sc: scEn, scAr = {} }: ProjectsContentProps) {
  const { t, isAr } = useLanguage();
  const [filter, setFilter] = useState("all");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const sc = isAr ? scAr : scEn;
  const dbProjects = isAr ? (dbProjectsAr || dbProjectsEn) : dbProjectsEn;

  // Use DB projects for EN, static translations for AR
  const projects = dbProjects && dbProjects.length > 0
    ? dbProjects
    : (t.projects?.items || []);

  const pageTitle = sc["projects.title"] || t.projects?.title || "Our Projects";
  const pageSubtitle = sc["projects.subtitle"] || t.projects?.subtitle || "";

  const filteredProjects = filter === "all"
    ? projects
    : projects.filter((p: any) => p.category === filter);

  const categories = [
    { id: "all",         label: t.projects?.categories?.all || "All" },
    { id: "residential", label: t.projects?.categories?.residential || "Residential" },
    { id: "commercial",  label: t.projects?.categories?.commercial || "Commercial" },
    { id: "industrial",  label: t.projects?.categories?.industrial || "Industrial" },
  ];

  const openLightbox = (project: any, index: number = 0) => {
    setSelectedProject(project);
    setCurrentImageIndex(index);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setSelectedProject(null);
    document.body.style.overflow = "auto";
  };

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedProject) {
      const imgs = selectedProject.images?.length > 0 ? selectedProject.images : [selectedProject.image];
      setCurrentImageIndex((prev) => (prev + 1) % imgs.length);
    }
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedProject) {
      const imgs = selectedProject.images?.length > 0 ? selectedProject.images : [selectedProject.image];
      setCurrentImageIndex((prev) => (prev - 1 + imgs.length) % imgs.length);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#f8f9fa]">
      <Navbar sc={scEn} scAr={scAr} />

      {/* Hero Section */}
      <div className="pt-32 pb-16 lg:pt-40 lg:pb-24 bg-[#0f1629] text-white relative overflow-hidden">
        <div className="absolute inset-0 dot-pattern opacity-10" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#3C4BA1]/20 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />

        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10 text-center">
          <a
            href="/"
            className={`inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-8 text-sm font-medium ${isAr ? "flex-row-reverse" : ""}`}
          >
            {isAr ? "→ العودة للرئيسية" : "← Back to Home"}
          </a>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6 animate-fade-in-up">
            {pageTitle}
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto animate-fade-in-up animation-delay-100">
            {pageSubtitle}
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 py-16 lg:py-24 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full">

        {/* Filters */}
        <div className={`flex flex-wrap justify-center gap-3 mb-16 animate-fade-in-up animation-delay-200 ${isAr ? "flex-row-reverse" : ""}`}>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilter(cat.id)}
              className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                filter === cat.id
                  ? "bg-[#3C4BA1] text-white shadow-lg shadow-[#3C4BA1]/30"
                  : "bg-white text-gray-600 hover:bg-gray-100 hover:text-[#0f1629] shadow-sm"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {filteredProjects.map((project: any, index: number) => (
            <div
              key={project.id || index}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 group border border-gray-100 flex flex-col animate-fade-in-up cursor-pointer"
              style={{ animationDelay: `${(index % 6) * 100}ms` }}
              onClick={() => openLightbox(project)}
            >
              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Category Badge */}
                <div className={`absolute top-4 ${isAr ? "right-4" : "left-4"} bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-lg text-xs font-bold text-[#3C4BA1] shadow-md`}>
                  {categories.find((c) => c.id === project.category)?.label || project.category}
                </div>

                {/* Expand Indicator Icon (Always visible) */}
                <div className={`absolute bottom-4 ${isAr ? "left-4" : "right-4"} bg-white/90 backdrop-blur-sm p-2 rounded-full text-[#3C4BA1] shadow-md group-hover:scale-110 transition-transform`}>
                  <Maximize2 size={18} />
                </div>

                {/* View Overlay */}
                <div className="absolute inset-0 bg-[#0f1629]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="bg-white/90 backdrop-blur-sm text-[#0f1629] px-4 py-2 rounded-full font-bold flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                    <Maximize2 size={16} />
                    {isAr ? "عرض الصور" : "View Gallery"}
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className={`p-6 md:p-8 flex-1 flex flex-col ${isAr ? "text-right" : ""}`}>
                <h3 className="text-xl font-bold text-[#0f1629] mb-3 group-hover:text-[#3C4BA1] transition-colors">
                  {project.title}
                </h3>
                <p className="text-[#4b5563] text-[15px] leading-relaxed flex-1">
                  {project.desc}
                </p>
                {/* Image Count */}
                {project.images && project.images.length > 1 && (
                  <p className="text-xs text-gray-400 mt-4 font-semibold">
                    {project.images.length} {isAr ? "صور" : "Images"}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-20 text-gray-500">
            {isAr ? "لا توجد مشاريع في هذا القسم." : "No projects found for this category."}
          </div>
        )}
      </div>

      <Footer sc={scEn} scAr={scAr} />

      {/* Lightbox */}
      {selectedProject && (() => {
        const imgs = selectedProject.images?.length > 0 ? selectedProject.images : [selectedProject.image];
        return (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 animate-fade-in backdrop-blur-sm">
            {/* Close */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 md:top-6 md:right-6 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 p-2 md:p-3 rounded-full transition-all z-50"
            >
              <X size={28} />
            </button>

            {/* Navigation */}
            {imgs.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-2 md:left-8 top-1/2 -translate-y-1/2 text-white/70 hover:text-white bg-black/50 hover:bg-black/80 p-2 md:p-3 rounded-full transition-all backdrop-blur-sm z-50"
                >
                  <ChevronLeft size={32} />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-2 md:right-8 top-1/2 -translate-y-1/2 text-white/70 hover:text-white bg-black/50 hover:bg-black/80 p-2 md:p-3 rounded-full transition-all backdrop-blur-sm z-50"
                >
                  <ChevronRight size={32} />
                </button>
              </>
            )}

            {/* Main Image */}
            <div className="w-full h-full p-4 md:p-12 flex items-center justify-center" onClick={closeLightbox}>
              <img
                src={imgs[currentImageIndex]}
                alt={selectedProject.title}
                className="max-w-full max-h-full object-contain drop-shadow-2xl select-none"
                onClick={(e) => e.stopPropagation()}
              />
            </div>

            {/* Counter */}
            {imgs.length > 1 && (
              <div className="absolute top-8 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur-md text-white px-4 py-1.5 rounded-full text-sm font-semibold tracking-wider">
                {currentImageIndex + 1} / {imgs.length}
              </div>
            )}
          </div>
        );
      })()}
    </div>
  );
}
