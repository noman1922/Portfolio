"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  AlertCircle,
  ArrowLeft,
  Check,
  CheckCircle2,
  ExternalLink,
  GitPullRequest,
  Layers3,
  Lock,
  LogOut,
  Pencil,
  Plus,
  RefreshCw,
  Search,
  Settings,
  Sparkles,
  Star,
  Trash2,
  X
} from "lucide-react";
import { Github } from "@/components/SocialIcons";
import { AnimatePresence, motion } from "motion/react";
import initialProjectsData from "@/data/projects.json";
import initialCertificationsData from "@/data/certifications.json";
import type { Project, Certification } from "@/data/portfolio";

type AdminCredentials = {
  token: string;
  owner: string;
  repo: string;
  branch: string;
  projectsPath: string;
  certificationsPath: string;
};

const DEFAULT_CREDENTIALS: AdminCredentials = {
  token: "",
  owner: "noman1922",
  repo: "Portfolio",
  branch: "main",
  projectsPath: "src/data/projects.json",
  certificationsPath: "src/data/certifications.json"
};

const CREDENTIALS_KEY = "portfolio_admin_credentials";
const DRAFT_PROJECTS_KEY = "portfolio_admin_draft_projects";
const DRAFT_CERTS_KEY = "portfolio_admin_draft_certs";

function toBase64Utf8(str: string): string {
  return btoa(unescape(encodeURIComponent(str)));
}

export default function AdminPage() {
  // Credentials & Auth state
  const [credentials, setCredentials] = useState<AdminCredentials>(DEFAULT_CREDENTIALS);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [authError, setAuthError] = useState("");
  const [isValidatingAuth, setIsValidatingAuth] = useState(false);

  // Tab & Search state
  const [activeTab, setActiveTab] = useState<"projects" | "certifications">("projects");
  const [searchQuery, setSearchQuery] = useState("");

  // Data state
  const [projectsList, setProjectsList] = useState<Project[]>(initialProjectsData as Project[]);
  const [certificationsList, setCertificationsList] = useState<Certification[]>(
    initialCertificationsData as Certification[]
  );

  // Modals for Create / Edit
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);

  const [editingCert, setEditingCert] = useState<Certification | null>(null);
  const [isCertModalOpen, setIsCertModalOpen] = useState(false);

  // Notification / Alert toast
  const [toastMessage, setToastMessage] = useState<{ text: string; type: "success" | "error" | "info" } | null>(null);

  // Publishing to GitHub state
  const [publishStatus, setPublishStatus] = useState<"idle" | "fetching" | "committing" | "success" | "error">("idle");
  const [publishLog, setPublishLog] = useState<string>("");
  const [publishError, setPublishError] = useState<string>("");

  // Load credentials & drafts from localStorage
  useEffect(() => {
    try {
      const storedCreds = localStorage.getItem(CREDENTIALS_KEY);
      if (storedCreds) {
        const parsed = JSON.parse(storedCreds) as AdminCredentials;
        if (parsed.token) {
          setCredentials(parsed);
          setIsAuthenticated(true);
        }
      }

      const storedProjects = localStorage.getItem(DRAFT_PROJECTS_KEY);
      if (storedProjects) {
        setProjectsList(JSON.parse(storedProjects));
      }

      const storedCerts = localStorage.getItem(DRAFT_CERTS_KEY);
      if (storedCerts) {
        setCertificationsList(JSON.parse(storedCerts));
      }
    } catch {
      // ignore parsing errors
    }
  }, []);

  const showToast = (text: string, type: "success" | "error" | "info" = "info") => {
    setToastMessage({ text, type });
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Track if changes exist compared to baseline JSON
  const hasUnpublishedChanges = useMemo(() => {
    const projectsChanged =
      JSON.stringify(projectsList) !== JSON.stringify(initialProjectsData);
    const certsChanged =
      JSON.stringify(certificationsList) !== JSON.stringify(initialCertificationsData);
    return projectsChanged || certsChanged;
  }, [projectsList, certificationsList]);

  // Persist local draft state
  const updateProjects = (newList: Project[]) => {
    setProjectsList(newList);
    localStorage.setItem(DRAFT_PROJECTS_KEY, JSON.stringify(newList));
  };

  const updateCertifications = (newList: Certification[]) => {
    setCertificationsList(newList);
    localStorage.setItem(DRAFT_CERTS_KEY, JSON.stringify(newList));
  };

  // Auth Save & Validate
  const handleSaveCredentials = async (credsToSave: AdminCredentials) => {
    setIsValidatingAuth(true);
    setAuthError("");

    try {
      const res = await fetch(`https://api.github.com/repos/${credsToSave.owner}/${credsToSave.repo}`, {
        headers: {
          Authorization: `Bearer ${credsToSave.token.trim()}`,
          Accept: "application/vnd.github+json"
        }
      });

      if (!res.ok) {
        if (res.status === 401) {
          throw new Error("Invalid GitHub Personal Access Token (401 Unauthorized). Please check token scopes.");
        } else if (res.status === 404) {
          throw new Error(`Repository "${credsToSave.owner}/${credsToSave.repo}" not found or token lacks access.`);
        } else {
          throw new Error(`GitHub verification failed (HTTP ${res.status}).`);
        }
      }

      localStorage.setItem(CREDENTIALS_KEY, JSON.stringify(credsToSave));
      setCredentials(credsToSave);
      setIsAuthenticated(true);
      setShowSettingsModal(false);
      showToast("Connected to GitHub repository successfully!", "success");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      setAuthError(msg);
    } finally {
      setIsValidatingAuth(false);
    }
  };

  const handleDisconnect = () => {
    if (confirm("Disconnect and clear your GitHub access token from this browser?")) {
      localStorage.removeItem(CREDENTIALS_KEY);
      setCredentials(DEFAULT_CREDENTIALS);
      setIsAuthenticated(false);
      setShowSettingsModal(false);
      showToast("Logged out & credentials cleared.", "info");
    }
  };

  // Reset to original JSON defaults
  const handleResetToBaseline = () => {
    if (confirm("Reset all project and certification drafts back to repository defaults?")) {
      updateProjects(initialProjectsData as Project[]);
      updateCertifications(initialCertificationsData as Certification[]);
      localStorage.removeItem(DRAFT_PROJECTS_KEY);
      localStorage.removeItem(DRAFT_CERTS_KEY);
      showToast("Drafts reset to original values.", "info");
    }
  };

  // Featured Item Toggles (Max 3 Enforced)
  const toggleProjectFeatured = (index: number) => {
    const item = projectsList[index];
    const currentFeaturedCount = projectsList.filter((p) => p.featured).length;

    if (!item.featured && currentFeaturedCount >= 3) {
      showToast("Maximum of 3 featured projects allowed for homepage. Unfeature another project first.", "error");
      return;
    }

    const updated = [...projectsList];
    updated[index] = { ...item, featured: !item.featured };
    updateProjects(updated);
    showToast(`"${item.title}" ${updated[index].featured ? "marked as featured" : "unfeatured"}.`, "success");
  };

  const toggleCertFeatured = (index: number) => {
    const item = certificationsList[index];
    const currentFeaturedCount = certificationsList.filter((c) => c.featured).length;

    if (!item.featured && currentFeaturedCount >= 3) {
      showToast("Maximum of 3 featured certificates allowed for homepage. Unfeature another item first.", "error");
      return;
    }

    const updated = [...certificationsList];
    updated[index] = { ...item, featured: !item.featured };
    updateCertifications(updated);
    showToast(`"${item.title}" ${updated[index].featured ? "marked as featured" : "unfeatured"}.`, "success");
  };

  // Delete Handlers
  const handleDeleteProject = (index: number) => {
    const title = projectsList[index].title;
    if (confirm(`Are you sure you want to delete "${title}"?`)) {
      const updated = projectsList.filter((_, i) => i !== index);
      updateProjects(updated);
      showToast(`Project "${title}" deleted.`, "info");
    }
  };

  const handleDeleteCert = (index: number) => {
    const title = certificationsList[index].title;
    if (confirm(`Are you sure you want to delete "${title}"?`)) {
      const updated = certificationsList.filter((_, i) => i !== index);
      updateCertifications(updated);
      showToast(`Certificate "${title}" deleted.`, "info");
    }
  };

  // Save Project Form
  const handleSaveProjectForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);

    const title = String(form.get("title") || "").trim();
    const id = String(form.get("id") || "").trim() || title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    const description = String(form.get("description") || "").trim();
    const specs = String(form.get("specs") || "").trim();
    const tech = String(form.get("tech") || "")
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
    const liveUrl = String(form.get("liveUrl") || "").trim() || null;
    const githubUrl = String(form.get("githubUrl") || "").trim() || null;
    const accent = String(form.get("accent") || "orange");
    const image = String(form.get("image") || "").trim() || undefined;
    const featured = form.get("featured") === "on";

    const currentFeaturedCount = projectsList.filter((p) => p.featured && p.id !== editingProject?.id).length;
    if (featured && currentFeaturedCount >= 3) {
      alert("Only 3 projects can be featured on the homepage. Please uncheck featured or unfeature another project first.");
      return;
    }

    const newProject: Project = {
      id,
      title,
      description,
      specs: specs || undefined,
      tech,
      accent,
      featured,
      liveUrl,
      githubUrl,
      credentialUrl: null,
      image,
      href: liveUrl || undefined,
      github: githubUrl || undefined
    };

    if (editingProject) {
      const updated = projectsList.map((p) => (p.id === editingProject.id || p.title === editingProject.title ? newProject : p));
      updateProjects(updated);
      showToast(`Updated "${title}".`, "success");
    } else {
      updateProjects([...projectsList, newProject]);
      showToast(`Added new project "${title}".`, "success");
    }

    setIsProjectModalOpen(false);
    setEditingProject(null);
  };

  // Save Certification Form
  const handleSaveCertForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);

    const title = String(form.get("title") || "").trim();
    const id = String(form.get("id") || "").trim() || title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    const issuer = String(form.get("issuer") || "").trim();
    const date = String(form.get("date") || "").trim();
    const credentialId = String(form.get("credentialId") || "").trim() || null;
    const credentialUrl = String(form.get("credentialUrl") || "").trim() || null;
    const image = String(form.get("image") || "").trim() || undefined;
    const skills = String(form.get("skills") || "")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    const featured = form.get("featured") === "on";

    const currentFeaturedCount = certificationsList.filter((c) => c.featured && c.id !== editingCert?.id).length;
    if (featured && currentFeaturedCount >= 3) {
      alert("Only 3 certificates can be featured on the homepage. Please uncheck featured or unfeature another item first.");
      return;
    }

    const newCert: Certification = {
      id,
      title,
      issuer,
      date,
      credentialId,
      credentialUrl,
      image,
      skills: skills.length ? skills : undefined,
      featured,
      liveUrl: null,
      githubUrl: null
    };

    if (editingCert) {
      const updated = certificationsList.map((c) => (c.id === editingCert.id || c.title === editingCert.title ? newCert : c));
      updateCertifications(updated);
      showToast(`Updated "${title}".`, "success");
    } else {
      updateCertifications([...certificationsList, newCert]);
      showToast(`Added new certificate "${title}".`, "success");
    }

    setIsCertModalOpen(false);
    setEditingCert(null);
  };

  // GitHub REST API Publish Workflow
  const handlePublishToGitHub = async () => {
    if (!credentials.token) {
      setShowSettingsModal(true);
      return;
    }

    setPublishStatus("fetching");
    setPublishError("");
    setPublishLog("Starting publishing workflow...");

    const commitFile = async (filePath: string, dataObj: unknown, label: string) => {
      setPublishLog(`Fetching current SHA for ${filePath}...`);
      const getUrl = `https://api.github.com/repos/${credentials.owner}/${credentials.repo}/contents/${filePath}?ref=${credentials.branch}`;

      let sha = "";
      const getRes = await fetch(getUrl, {
        headers: {
          Authorization: `Bearer ${credentials.token.trim()}`,
          Accept: "application/vnd.github+json"
        }
      });

      if (getRes.ok) {
        const fileData = await getRes.json();
        sha = fileData.sha;
      } else if (getRes.status !== 404) {
        throw new Error(`Failed to fetch current ${filePath}: HTTP ${getRes.status} (${getRes.statusText})`);
      }

      setPublishLog(`Committing updated ${label} to ${filePath}...`);
      const putUrl = `https://api.github.com/repos/${credentials.owner}/${credentials.repo}/contents/${filePath}`;
      const contentBase64 = toBase64Utf8(JSON.stringify(dataObj, null, 2) + "\n");

      const putRes = await fetch(putUrl, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${credentials.token.trim()}`,
          Accept: "application/vnd.github+json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          message: `chore(cms): update ${label} via admin panel`,
          content: contentBase64,
          sha: sha || undefined,
          branch: credentials.branch
        })
      });

      if (!putRes.ok) {
        const errorData = await putRes.json().catch(() => ({}));
        throw new Error(errorData.message || `Failed to commit ${filePath}: HTTP ${putRes.status}`);
      }
    };

    try {
      setPublishStatus("committing");

      // Commit projects.json (primary and sync path)
      await commitFile(credentials.projectsPath, projectsList, "projects data");
      if (credentials.projectsPath !== "data/projects.json") {
        try {
          await commitFile("data/projects.json", projectsList, "projects data (root)");
        } catch {
          // non-critical fallback
        }
      }

      // Commit certifications.json (primary and sync path)
      await commitFile(credentials.certificationsPath, certificationsList, "certifications data");
      if (credentials.certificationsPath !== "data/certifications.json") {
        try {
          await commitFile("data/certifications.json", certificationsList, "certifications data (root)");
        } catch {
          // non-critical fallback
        }
      }

      setPublishStatus("success");
      setPublishLog("All files committed successfully!");
      localStorage.removeItem(DRAFT_PROJECTS_KEY);
      localStorage.removeItem(DRAFT_CERTS_KEY);
      showToast("Changes successfully committed to GitHub! GitHub Actions will now build and deploy the update.", "success");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      setPublishStatus("error");
      setPublishError(msg);
      showToast(`Commit failed: ${msg}`, "error");
    }
  };

  // Filtered lists
  const filteredProjects = useMemo(() => {
    if (!searchQuery) return projectsList;
    const q = searchQuery.toLowerCase();
    return projectsList.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tech.some((t) => t.toLowerCase().includes(q))
    );
  }, [projectsList, searchQuery]);

  const filteredCerts = useMemo(() => {
    if (!searchQuery) return certificationsList;
    const q = searchQuery.toLowerCase();
    return certificationsList.filter(
      (c) =>
        c.title.toLowerCase().includes(q) ||
        c.issuer.toLowerCase().includes(q) ||
        (c.skills && c.skills.some((s) => s.toLowerCase().includes(q)))
    );
  }, [certificationsList, searchQuery]);

  return (
    <div className="min-h-screen bg-[#151312] text-[#fffaf6] selection:bg-[#c5ff41] selection:text-[#151312]">
      {/* Background radial glow */}
      <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(circle_at_15%_10%,rgba(244,108,56,0.12),transparent_30rem),radial-gradient(circle_at_85%_5%,rgba(197,255,65,0.08),transparent_26rem)]" />
      <div className="noise" aria-hidden="true" />

      {/* Admin Top Navigation Bar */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#151312]/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-bold text-white/70 transition hover:border-[#f46c38] hover:text-white"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Portfolio</span>
            </Link>

            <div className="flex items-center gap-2">
              <span className="grid h-7 w-7 place-items-center rounded-lg bg-[#f46c38] text-xs font-black text-white">
                AP
              </span>
              <span className="text-sm font-black uppercase tracking-wider text-white">
                Admin Panel
              </span>
              <span className="rounded-full bg-[#c5ff41]/20 px-2 py-0.5 text-[0.65rem] font-bold uppercase tracking-wider text-[#c5ff41]">
                Static CMS
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Publish Status / Trigger */}
            <button
              type="button"
              onClick={handlePublishToGitHub}
              disabled={publishStatus === "fetching" || publishStatus === "committing"}
              className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-black transition active:scale-95 shadow-md ${
                hasUnpublishedChanges
                  ? "bg-[#f46c38] text-white hover:bg-[#ff7b4b] animate-pulse"
                  : "bg-white/10 text-white/80 hover:bg-white/20"
              }`}
            >
              {publishStatus === "fetching" || publishStatus === "committing" ? (
                <>
                  <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                  <span>Publishing...</span>
                </>
              ) : (
                <>
                  <GitPullRequest className="h-3.5 w-3.5" />
                  <span>Publish to GitHub</span>
                  {hasUnpublishedChanges && (
                    <span className="h-2 w-2 rounded-full bg-[#c5ff41]" />
                  )}
                </>
              )}
            </button>

            {/* Settings & Credentials Modal Trigger */}
            <button
              type="button"
              onClick={() => setShowSettingsModal(true)}
              className="grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-white/5 text-white/70 transition hover:border-white/30 hover:text-white"
              title="GitHub Repository Settings"
              aria-label="GitHub Settings"
            >
              <Settings className="h-4 w-4" />
            </button>

            {/* Logout / Disconnect */}
            {isAuthenticated && (
              <button
                type="button"
                onClick={handleDisconnect}
                className="grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-white/5 text-red-400 transition hover:border-red-400/40 hover:bg-red-500/10"
                title="Disconnect & Lock Session"
                aria-label="Disconnect"
              >
                <LogOut className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="relative z-10 mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10">
        {/* Repository Status Banner */}
        <div className="mb-8 flex flex-col justify-between gap-4 rounded-2xl border border-white/10 bg-[#1a1716] p-5 shadow-xl sm:flex-row sm:items-center">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white/5 text-[#c5ff41] border border-white/10">
              <Github className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <p className="text-sm font-black text-white">
                  {credentials.owner}/{credentials.repo}
                </p>
                <span className="rounded-full bg-white/10 px-2 py-0.5 text-[0.65rem] font-bold text-white/70">
                  {credentials.branch}
                </span>
              </div>
              <p className="text-xs text-white/50">
                {isAuthenticated
                  ? "Connected via GitHub Personal Access Token"
                  : "Token not configured — credentials needed to publish"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {hasUnpublishedChanges ? (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#f46c38]/40 bg-[#f46c38]/10 px-3 py-1 text-xs font-bold text-[#f46c38]">
                <Sparkles className="h-3.5 w-3.5" />
                Draft Changes Unsaved
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#c5ff41]/40 bg-[#c5ff41]/10 px-3 py-1 text-xs font-bold text-[#c5ff41]">
                <Check className="h-3.5 w-3.5" />
                In Sync With Repo
              </span>
            )}

            <button
              type="button"
              onClick={handleResetToBaseline}
              className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-white/60 hover:text-white hover:bg-white/10 transition"
            >
              Reset Drafts
            </button>
          </div>
        </div>

        {/* Tab Selection & Search Row */}
        <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          {/* Tabs */}
          <div className="flex items-center rounded-xl border border-white/10 bg-white/5 p-1">
            <button
              type="button"
              onClick={() => setActiveTab("projects")}
              className={`flex items-center gap-2 rounded-lg px-4 py-2 text-xs sm:text-sm font-bold transition ${
                activeTab === "projects"
                  ? "bg-[#f46c38] text-white shadow-md"
                  : "text-white/60 hover:text-white"
              }`}
            >
              <Layers3 className="h-4 w-4" />
              <span>Projects ({projectsList.length})</span>
              <span className="rounded-full bg-black/30 px-2 py-0.5 text-[0.65rem] font-black">
                {projectsList.filter((p) => p.featured).length}/3 Featured
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("certifications")}
              className={`flex items-center gap-2 rounded-lg px-4 py-2 text-xs sm:text-sm font-bold transition ${
                activeTab === "certifications"
                  ? "bg-[#f46c38] text-white shadow-md"
                  : "text-white/60 hover:text-white"
              }`}
            >
              <Star className="h-4 w-4" />
              <span>Certifications ({certificationsList.length})</span>
              <span className="rounded-full bg-black/30 px-2 py-0.5 text-[0.65rem] font-black">
                {certificationsList.filter((c) => c.featured).length}/3 Featured
              </span>
            </button>
          </div>

          {/* Search & Add New Actions */}
          <div className="flex items-center gap-3">
            <div className="relative flex-1 sm:w-64">
              <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-white/40" />
              <input
                type="text"
                placeholder={`Search ${activeTab}...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-10 w-full rounded-xl border border-white/10 bg-white/5 pl-9 pr-4 text-xs font-semibold text-white placeholder:text-white/30 focus:border-[#f46c38] focus:outline"
              />
            </div>

            {activeTab === "projects" ? (
              <button
                type="button"
                onClick={() => {
                  setEditingProject(null);
                  setIsProjectModalOpen(true);
                }}
                className="inline-flex h-10 items-center gap-1.5 rounded-xl bg-white px-4 text-xs font-black text-[#151312] transition hover:bg-[#c5ff41] active:scale-95 shadow-md"
              >
                <Plus className="h-4 w-4" />
                <span className="hidden sm:inline">Add Project</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => {
                  setEditingCert(null);
                  setIsCertModalOpen(true);
                }}
                className="inline-flex h-10 items-center gap-1.5 rounded-xl bg-white px-4 text-xs font-black text-[#151312] transition hover:bg-[#c5ff41] active:scale-95 shadow-md"
              >
                <Plus className="h-4 w-4" />
                <span className="hidden sm:inline">Add Certificate</span>
              </button>
            )}
          </div>
        </div>

        {/* Tab 1: Projects Table / List */}
        {activeTab === "projects" && (
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#1a1716] shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="border-b border-white/10 bg-white/[0.03] text-[0.68rem] font-black uppercase tracking-wider text-white/50">
                  <tr>
                    <th className="px-5 py-3.5">Featured (Max 3)</th>
                    <th className="px-5 py-3.5">Project</th>
                    <th className="px-5 py-3.5">Tech Stack</th>
                    <th className="px-5 py-3.5">Links</th>
                    <th className="px-5 py-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 font-semibold text-white/80">
                  {filteredProjects.map((project, index) => (
                    <tr
                      key={project.id || project.title}
                      className="transition hover:bg-white/[0.02]"
                    >
                      {/* Featured Toggle */}
                      <td className="px-5 py-4 whitespace-nowrap">
                        <button
                          type="button"
                          onClick={() => toggleProjectFeatured(index)}
                          className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-black transition ${
                            project.featured
                              ? "bg-yellow-400/20 text-yellow-300 border border-yellow-400/40"
                              : "bg-white/5 text-white/40 border border-white/10 hover:border-white/20 hover:text-white"
                          }`}
                          title={project.featured ? "Click to unfeature" : "Click to feature on homepage"}
                        >
                          <Star className={`h-3.5 w-3.5 ${project.featured ? "fill-yellow-300" : ""}`} />
                          <span>{project.featured ? "Featured" : "Standard"}</span>
                        </button>
                      </td>

                      {/* Project Info */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="relative h-11 w-16 shrink-0 overflow-hidden rounded-lg bg-black/40 border border-white/10">
                            {project.image ? (
                              <Image
                                src={project.image}
                                alt={project.title}
                                fill
                                className="object-cover"
                              />
                            ) : (
                              <div className="grid h-full place-items-center text-[0.6rem] text-white/40">
                                None
                              </div>
                            )}
                          </div>
                          <div>
                            <p className="font-black text-white text-sm">
                              {project.title}
                            </p>
                            <p className="mt-0.5 line-clamp-1 max-w-sm text-xs text-white/50">
                              {project.description}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Tech Chips */}
                      <td className="px-5 py-4">
                        <div className="flex flex-wrap gap-1 max-w-xs">
                          {project.tech.map((t) => (
                            <span
                              key={t}
                              className="rounded bg-white/5 border border-white/10 px-2 py-0.5 text-[0.65rem] text-white/70"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </td>

                      {/* URLs */}
                      <td className="px-5 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          {project.liveUrl && (
                            <a
                              href={project.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="grid h-7 w-7 place-items-center rounded-lg border border-white/10 bg-white/5 text-white/70 hover:text-[#c5ff41] hover:border-[#c5ff41]/40"
                              title="Live Demo"
                            >
                              <ExternalLink className="h-3.5 w-3.5" />
                            </a>
                          )}
                          {project.githubUrl && (
                            <a
                              href={project.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="grid h-7 w-7 place-items-center rounded-lg border border-white/10 bg-white/5 text-white/70 hover:text-white hover:border-white/40"
                              title="GitHub Repository"
                            >
                              <Github className="h-3.5 w-3.5" />
                            </a>
                          )}
                          {!project.liveUrl && !project.githubUrl && (
                            <span className="text-white/30 text-xs">No links</span>
                          )}
                        </div>
                      </td>

                      {/* Edit & Delete Actions */}
                      <td className="px-5 py-4 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            type="button"
                            onClick={() => {
                              setEditingProject(project);
                              setIsProjectModalOpen(true);
                            }}
                            className="grid h-8 w-8 place-items-center rounded-lg border border-white/10 bg-white/5 text-white/70 hover:bg-white/10 hover:text-white"
                            title="Edit Project"
                          >
                            <Pencil className="h-3.5 w-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteProject(index)}
                            className="grid h-8 w-8 place-items-center rounded-lg border border-white/10 bg-white/5 text-red-400 hover:bg-red-500/10 hover:border-red-400/40"
                            title="Delete Project"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {filteredProjects.length === 0 && (
                    <tr>
                      <td colSpan={5} className="py-12 text-center text-white/40">
                        No projects match the query.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 2: Certifications Table / List */}
        {activeTab === "certifications" && (
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#1a1716] shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="border-b border-white/10 bg-white/[0.03] text-[0.68rem] font-black uppercase tracking-wider text-white/50">
                  <tr>
                    <th className="px-5 py-3.5">Featured (Max 3)</th>
                    <th className="px-5 py-3.5">Title & Issuer</th>
                    <th className="px-5 py-3.5">Date</th>
                    <th className="px-5 py-3.5">Verification Link</th>
                    <th className="px-5 py-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 font-semibold text-white/80">
                  {filteredCerts.map((cert, index) => (
                    <tr
                      key={cert.id || cert.title}
                      className="transition hover:bg-white/[0.02]"
                    >
                      {/* Featured Toggle */}
                      <td className="px-5 py-4 whitespace-nowrap">
                        <button
                          type="button"
                          onClick={() => toggleCertFeatured(index)}
                          className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-black transition ${
                            cert.featured
                              ? "bg-yellow-400/20 text-yellow-300 border border-yellow-400/40"
                              : "bg-white/5 text-white/40 border border-white/10 hover:border-white/20 hover:text-white"
                          }`}
                          title={cert.featured ? "Click to unfeature" : "Click to feature on homepage"}
                        >
                          <Star className={`h-3.5 w-3.5 ${cert.featured ? "fill-yellow-300" : ""}`} />
                          <span>{cert.featured ? "Featured" : "Standard"}</span>
                        </button>
                      </td>

                      {/* Certification Title & Issuer */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="relative h-10 w-12 shrink-0 overflow-hidden rounded-lg bg-black/40 border border-white/10">
                            {cert.image ? (
                              <Image
                                src={cert.image}
                                alt={cert.title}
                                fill
                                className="object-contain p-1"
                              />
                            ) : (
                              <div className="grid h-full place-items-center text-[0.6rem] text-white/40">
                                None
                              </div>
                            )}
                          </div>
                          <div>
                            <p className="font-black text-white text-sm">
                              {cert.title}
                            </p>
                            <p className="mt-0.5 text-xs text-white/50">
                              {cert.issuer} {cert.credentialId ? `• ID: ${cert.credentialId}` : ""}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Date */}
                      <td className="px-5 py-4 whitespace-nowrap text-white/70">
                        {cert.date}
                      </td>

                      {/* Verification Link */}
                      <td className="px-5 py-4 whitespace-nowrap">
                        {cert.credentialUrl ? (
                          <a
                            href={cert.credentialUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs text-[#c5ff41] hover:underline"
                          >
                            <span>Verify URL</span>
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        ) : (
                          <span className="text-white/30 text-xs">No URL</span>
                        )}
                      </td>

                      {/* Edit & Delete Actions */}
                      <td className="px-5 py-4 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            type="button"
                            onClick={() => {
                              setEditingCert(cert);
                              setIsCertModalOpen(true);
                            }}
                            className="grid h-8 w-8 place-items-center rounded-lg border border-white/10 bg-white/5 text-white/70 hover:bg-white/10 hover:text-white"
                            title="Edit Certificate"
                          >
                            <Pencil className="h-3.5 w-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteCert(index)}
                            className="grid h-8 w-8 place-items-center rounded-lg border border-white/10 bg-white/5 text-red-400 hover:bg-red-500/10 hover:border-red-400/40"
                            title="Delete Certificate"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {filteredCerts.length === 0 && (
                    <tr>
                      <td colSpan={5} className="py-12 text-center text-white/40">
                        No certifications match the query.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>

      {/* GitHub Setup / Settings Modal */}
      <AnimatePresence>
        {(!isAuthenticated || showSettingsModal) && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative w-full max-w-lg rounded-2xl border border-white/15 bg-[#1a1716] p-6 sm:p-8 text-white shadow-2xl"
            >
              {isAuthenticated && (
                <button
                  type="button"
                  onClick={() => setShowSettingsModal(false)}
                  className="absolute top-5 right-5 text-white/60 hover:text-white"
                >
                  <X className="h-5 w-5" />
                </button>
              )}

              <div className="flex items-center gap-3 mb-2">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-[#f46c38] text-white">
                  <Lock className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-xl font-black">GitHub Repository Access</h3>
                  <p className="text-xs text-white/50">
                    Connect your token to publish changes directly via GitHub API
                  </p>
                </div>
              </div>

              {authError && (
                <div className="mt-4 flex items-start gap-2.5 rounded-xl border border-red-500/30 bg-red-500/10 p-3.5 text-xs text-red-300">
                  <AlertCircle className="h-4 w-4 shrink-0 text-red-400 mt-0.5" />
                  <p>{authError}</p>
                </div>
              )}

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const form = new FormData(e.currentTarget);
                  handleSaveCredentials({
                    token: String(form.get("token") || "").trim(),
                    owner: String(form.get("owner") || "").trim(),
                    repo: String(form.get("repo") || "").trim(),
                    branch: String(form.get("branch") || "main").trim(),
                    projectsPath: String(form.get("projectsPath") || "src/data/projects.json").trim(),
                    certificationsPath: String(form.get("certificationsPath") || "src/data/certifications.json").trim()
                  });
                }}
                className="mt-5 space-y-4 text-xs font-bold"
              >
                <div>
                  <label className="block uppercase tracking-wider text-white/60 mb-1.5">
                    GitHub Personal Access Token (PAT with `repo` scope) *
                  </label>
                  <input
                    required
                    name="token"
                    type="password"
                    defaultValue={credentials.token}
                    placeholder="ghp_xxxxxxxxxxxxxxxxxxxx"
                    className="h-11 w-full rounded-xl border border-white/10 bg-white/5 px-4 font-mono text-xs text-white placeholder:text-white/20 focus:border-[#f46c38] focus:outline"
                  />
                  <p className="mt-1 text-[0.68rem] font-normal text-white/40">
                    Stored exclusively in your local browser storage (`localStorage`).
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block uppercase tracking-wider text-white/60 mb-1.5">
                      Username / Owner *
                    </label>
                    <input
                      required
                      name="owner"
                      type="text"
                      defaultValue={credentials.owner || "noman1922"}
                      placeholder="noman1922"
                      className="h-11 w-full rounded-xl border border-white/10 bg-white/5 px-4 text-xs text-white placeholder:text-white/20 focus:border-[#f46c38] focus:outline"
                    />
                  </div>
                  <div>
                    <label className="block uppercase tracking-wider text-white/60 mb-1.5">
                      Repository *
                    </label>
                    <input
                      required
                      name="repo"
                      type="text"
                      defaultValue={credentials.repo || "Portfolio"}
                      placeholder="Portfolio"
                      className="h-11 w-full rounded-xl border border-white/10 bg-white/5 px-4 text-xs text-white placeholder:text-white/20 focus:border-[#f46c38] focus:outline"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block uppercase tracking-wider text-white/60 mb-1.5">
                      Branch
                    </label>
                    <input
                      name="branch"
                      type="text"
                      defaultValue={credentials.branch || "main"}
                      className="h-10 w-full rounded-xl border border-white/10 bg-white/5 px-3 text-xs text-white focus:border-[#f46c38] focus:outline"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block uppercase tracking-wider text-white/60 mb-1.5">
                      Projects JSON Path
                    </label>
                    <input
                      name="projectsPath"
                      type="text"
                      defaultValue={credentials.projectsPath || "src/data/projects.json"}
                      className="h-10 w-full rounded-xl border border-white/10 bg-white/5 px-3 text-xs font-mono text-white focus:border-[#f46c38] focus:outline"
                    />
                  </div>
                </div>

                <div>
                  <label className="block uppercase tracking-wider text-white/60 mb-1.5">
                    Certifications JSON Path
                  </label>
                  <input
                    name="certificationsPath"
                    type="text"
                    defaultValue={credentials.certificationsPath || "src/data/certifications.json"}
                    className="h-10 w-full rounded-xl border border-white/10 bg-white/5 px-3 text-xs font-mono text-white focus:border-[#f46c38] focus:outline"
                  />
                </div>

                <div className="pt-3 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <Link
                      href="/"
                      className="text-xs font-semibold text-white/50 hover:text-white"
                    >
                      ← Exit to Portfolio
                    </Link>
                    <button
                      type="button"
                      onClick={() => {
                        setIsAuthenticated(true);
                        setShowSettingsModal(false);
                        showToast("Entered Draft Mode. You can manage drafts locally; configure PAT to publish.", "info");
                      }}
                      className="text-xs font-semibold text-[#c5ff41]/80 hover:text-[#c5ff41] underline underline-offset-4"
                    >
                      Explore in Demo Mode
                    </button>
                  </div>

                  <button
                    type="submit"
                    disabled={isValidatingAuth}
                    className="inline-flex items-center gap-2 rounded-full bg-[#f46c38] px-6 py-3 text-xs font-black uppercase tracking-wider text-white shadow-lg transition hover:bg-[#ff7b4b] active:scale-95 disabled:opacity-50"
                  >
                    {isValidatingAuth ? (
                      <>
                        <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                        <span>Verifying...</span>
                      </>
                    ) : (
                      <span>Save & Connect</span>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Project Form Modal */}
      <AnimatePresence>
        {isProjectModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-2xl my-8 rounded-2xl border border-white/15 bg-[#1a1716] p-6 sm:p-8 text-white shadow-2xl"
            >
              <button
                type="button"
                onClick={() => {
                  setIsProjectModalOpen(false);
                  setEditingProject(null);
                }}
                className="absolute top-5 right-5 text-white/60 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>

              <h3 className="text-2xl font-black mb-1">
                {editingProject ? "Edit Project" : "Add New Project"}
              </h3>
              <p className="text-xs text-white/50 mb-6">
                Fill in project attributes, specifications, and links.
              </p>

              <form onSubmit={handleSaveProjectForm} className="space-y-4 text-xs font-bold">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block uppercase tracking-wider text-white/60 mb-1.5">
                      Project Title *
                    </label>
                    <input
                      required
                      name="title"
                      type="text"
                      defaultValue={editingProject?.title || ""}
                      placeholder="e.g. ENKRYX"
                      className="h-11 w-full rounded-xl border border-white/10 bg-white/5 px-4 text-xs text-white placeholder:text-white/20 focus:border-[#f46c38] focus:outline"
                    />
                  </div>

                  <div>
                    <label className="block uppercase tracking-wider text-white/60 mb-1.5">
                      Slug / ID
                    </label>
                    <input
                      name="id"
                      type="text"
                      defaultValue={editingProject?.id || ""}
                      placeholder="e.g. enkryx"
                      className="h-11 w-full rounded-xl border border-white/10 bg-white/5 px-4 text-xs text-white placeholder:text-white/20 focus:border-[#f46c38] focus:outline"
                    />
                  </div>
                </div>

                <div>
                  <label className="block uppercase tracking-wider text-white/60 mb-1.5">
                    Short Description *
                  </label>
                  <textarea
                    required
                    name="description"
                    rows={2}
                    defaultValue={editingProject?.description || ""}
                    placeholder="Brief 1-2 sentence overview of the project..."
                    className="w-full rounded-xl border border-white/10 bg-white/5 p-3.5 text-xs text-white placeholder:text-white/20 focus:border-[#f46c38] focus:outline resize-none"
                  />
                </div>

                <div>
                  <label className="block uppercase tracking-wider text-white/60 mb-1.5">
                    Detailed Specs / Architecture Overview (for Modal)
                  </label>
                  <textarea
                    name="specs"
                    rows={3}
                    defaultValue={editingProject?.specs || ""}
                    placeholder="Production architecture, database model, payment webhook flow..."
                    className="w-full rounded-xl border border-white/10 bg-white/5 p-3.5 text-xs text-white placeholder:text-white/20 focus:border-[#f46c38] focus:outline resize-none"
                  />
                </div>

                <div>
                  <label className="block uppercase tracking-wider text-white/60 mb-1.5">
                    Tech Stack (comma-separated) *
                  </label>
                  <input
                    required
                    name="tech"
                    type="text"
                    defaultValue={editingProject?.tech.join(", ") || ""}
                    placeholder="Next.js, React, TypeScript, Tailwind CSS"
                    className="h-11 w-full rounded-xl border border-white/10 bg-white/5 px-4 text-xs text-white placeholder:text-white/20 focus:border-[#f46c38] focus:outline"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block uppercase tracking-wider text-white/60 mb-1.5">
                      Live URL (optional)
                    </label>
                    <input
                      name="liveUrl"
                      type="url"
                      defaultValue={editingProject?.liveUrl || ""}
                      placeholder="https://example.com"
                      className="h-11 w-full rounded-xl border border-white/10 bg-white/5 px-4 text-xs text-white placeholder:text-white/20 focus:border-[#f46c38] focus:outline"
                    />
                  </div>

                  <div>
                    <label className="block uppercase tracking-wider text-white/60 mb-1.5">
                      GitHub URL (optional)
                    </label>
                    <input
                      name="githubUrl"
                      type="url"
                      defaultValue={editingProject?.githubUrl || ""}
                      placeholder="https://github.com/..."
                      className="h-11 w-full rounded-xl border border-white/10 bg-white/5 px-4 text-xs text-white placeholder:text-white/20 focus:border-[#f46c38] focus:outline"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block uppercase tracking-wider text-white/60 mb-1.5">
                      Image Path
                    </label>
                    <input
                      name="image"
                      type="text"
                      defaultValue={editingProject?.image || ""}
                      placeholder="/images/projects/enkryx.jpg"
                      className="h-11 w-full rounded-xl border border-white/10 bg-white/5 px-4 text-xs text-white placeholder:text-white/20 focus:border-[#f46c38] focus:outline"
                    />
                  </div>

                  <div>
                    <label className="block uppercase tracking-wider text-white/60 mb-1.5">
                      Accent Tone
                    </label>
                    <select
                      name="accent"
                      defaultValue={editingProject?.accent || "orange"}
                      className="h-11 w-full rounded-xl border border-white/10 bg-[#242120] px-4 text-xs text-white focus:border-[#f46c38] focus:outline"
                    >
                      <option value="orange">Orange (Flame)</option>
                      <option value="acid">Acid (Neon Lime)</option>
                      <option value="steel">Steel (Charcoal Silver)</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      name="featured"
                      type="checkbox"
                      defaultChecked={editingProject?.featured || false}
                      className="h-4 w-4 rounded accent-[#f46c38]"
                    />
                    <span className="text-xs uppercase tracking-wider text-white">
                      Featured on Homepage (Max 3)
                    </span>
                  </label>
                </div>

                <div className="pt-4 flex items-center justify-end gap-3 border-t border-white/10">
                  <button
                    type="button"
                    onClick={() => {
                      setIsProjectModalOpen(false);
                      setEditingProject(null);
                    }}
                    className="rounded-full border border-white/10 px-5 py-2.5 text-xs font-semibold text-white/70 hover:bg-white/5"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="rounded-full bg-[#f46c38] px-6 py-2.5 text-xs font-black uppercase tracking-wider text-white shadow-lg hover:bg-[#ff7b4b] active:scale-95"
                  >
                    {editingProject ? "Update Project" : "Add Project"}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Certification Form Modal */}
      <AnimatePresence>
        {isCertModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-2xl my-8 rounded-2xl border border-white/15 bg-[#1a1716] p-6 sm:p-8 text-white shadow-2xl"
            >
              <button
                type="button"
                onClick={() => {
                  setIsCertModalOpen(false);
                  setEditingCert(null);
                }}
                className="absolute top-5 right-5 text-white/60 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>

              <h3 className="text-2xl font-black mb-1">
                {editingCert ? "Edit Certification" : "Add New Certification"}
              </h3>
              <p className="text-xs text-white/50 mb-6">
                Fill in credential details, verification link, and badge imagery.
              </p>

              <form onSubmit={handleSaveCertForm} className="space-y-4 text-xs font-bold">
                <div>
                  <label className="block uppercase tracking-wider text-white/60 mb-1.5">
                    Certification Title *
                  </label>
                  <input
                    required
                    name="title"
                    type="text"
                    defaultValue={editingCert?.title || ""}
                    placeholder="e.g. NASA International Space Apps Challenge 2025"
                    className="h-11 w-full rounded-xl border border-white/10 bg-white/5 px-4 text-xs text-white placeholder:text-white/20 focus:border-[#f46c38] focus:outline"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block uppercase tracking-wider text-white/60 mb-1.5">
                      Issuer / Organization *
                    </label>
                    <input
                      required
                      name="issuer"
                      type="text"
                      defaultValue={editingCert?.issuer || ""}
                      placeholder="e.g. Microsoft / NASA / Udemy"
                      className="h-11 w-full rounded-xl border border-white/10 bg-white/5 px-4 text-xs text-white placeholder:text-white/20 focus:border-[#f46c38] focus:outline"
                    />
                  </div>

                  <div>
                    <label className="block uppercase tracking-wider text-white/60 mb-1.5">
                      Issue Date *
                    </label>
                    <input
                      required
                      name="date"
                      type="text"
                      defaultValue={editingCert?.date || ""}
                      placeholder="e.g. Oct 2025"
                      className="h-11 w-full rounded-xl border border-white/10 bg-white/5 px-4 text-xs text-white placeholder:text-white/20 focus:border-[#f46c38] focus:outline"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block uppercase tracking-wider text-white/60 mb-1.5">
                      Credential ID (optional)
                    </label>
                    <input
                      name="credentialId"
                      type="text"
                      defaultValue={editingCert?.credentialId || ""}
                      placeholder="e.g. UC-a9e65966-..."
                      className="h-11 w-full rounded-xl border border-white/10 bg-white/5 px-4 text-xs text-white placeholder:text-white/20 focus:border-[#f46c38] focus:outline"
                    />
                  </div>

                  <div>
                    <label className="block uppercase tracking-wider text-white/60 mb-1.5">
                      Credential Verification URL
                    </label>
                    <input
                      name="credentialUrl"
                      type="url"
                      defaultValue={editingCert?.credentialUrl || ""}
                      placeholder="https://..."
                      className="h-11 w-full rounded-xl border border-white/10 bg-white/5 px-4 text-xs text-white placeholder:text-white/20 focus:border-[#f46c38] focus:outline"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block uppercase tracking-wider text-white/60 mb-1.5">
                      Badge / Image Path
                    </label>
                    <input
                      name="image"
                      type="text"
                      defaultValue={editingCert?.image || ""}
                      placeholder="/images/certifications/..."
                      className="h-11 w-full rounded-xl border border-white/10 bg-white/5 px-4 text-xs text-white placeholder:text-white/20 focus:border-[#f46c38] focus:outline"
                    />
                  </div>

                  <div>
                    <label className="block uppercase tracking-wider text-white/60 mb-1.5">
                      Skills (comma-separated)
                    </label>
                    <input
                      name="skills"
                      type="text"
                      defaultValue={editingCert?.skills?.join(", ") || ""}
                      placeholder="AI, Machine Learning, Strategy"
                      className="h-11 w-full rounded-xl border border-white/10 bg-white/5 px-4 text-xs text-white placeholder:text-white/20 focus:border-[#f46c38] focus:outline"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      name="featured"
                      type="checkbox"
                      defaultChecked={editingCert?.featured || false}
                      className="h-4 w-4 rounded accent-[#f46c38]"
                    />
                    <span className="text-xs uppercase tracking-wider text-white">
                      Featured on Homepage (Max 3)
                    </span>
                  </label>
                </div>

                <div className="pt-4 flex items-center justify-end gap-3 border-t border-white/10">
                  <button
                    type="button"
                    onClick={() => {
                      setIsCertModalOpen(false);
                      setEditingCert(null);
                    }}
                    className="rounded-full border border-white/10 px-5 py-2.5 text-xs font-semibold text-white/70 hover:bg-white/5"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="rounded-full bg-[#f46c38] px-6 py-2.5 text-xs font-black uppercase tracking-wider text-white shadow-lg hover:bg-[#ff7b4b] active:scale-95"
                  >
                    {editingCert ? "Update Certificate" : "Add Certificate"}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className={`fixed bottom-6 right-6 z-50 flex items-center gap-2.5 rounded-2xl border px-5 py-3.5 text-xs font-bold shadow-2xl backdrop-blur-xl ${
              toastMessage.type === "success"
                ? "border-[#c5ff41]/40 bg-[#1a1716] text-[#c5ff41]"
                : toastMessage.type === "error"
                ? "border-red-500/40 bg-[#1a1716] text-red-300"
                : "border-white/20 bg-[#1a1716] text-white"
            }`}
          >
            {toastMessage.type === "success" && <CheckCircle2 className="h-4 w-4" />}
            {toastMessage.type === "error" && <AlertCircle className="h-4 w-4" />}
            <span>{toastMessage.text}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Publish Progress / Log Modal */}
      <AnimatePresence>
        {(publishStatus === "committing" || publishStatus === "fetching" || publishStatus === "success" || publishStatus === "error") && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-md rounded-2xl border border-white/15 bg-[#181514] p-6 text-white shadow-2xl"
            >
              <div className="flex items-center gap-3 mb-4">
                {publishStatus === "success" ? (
                  <div className="grid h-10 w-10 place-items-center rounded-xl bg-[#c5ff41]/20 text-[#c5ff41]">
                    <CheckCircle2 className="h-6 w-6" />
                  </div>
                ) : publishStatus === "error" ? (
                  <div className="grid h-10 w-10 place-items-center rounded-xl bg-red-500/20 text-red-400">
                    <AlertCircle className="h-6 w-6" />
                  </div>
                ) : (
                  <div className="grid h-10 w-10 place-items-center rounded-xl bg-[#f46c38]/20 text-[#f46c38]">
                    <RefreshCw className="h-5 w-5 animate-spin" />
                  </div>
                )}
                <div>
                  <h4 className="text-base font-black">
                    {publishStatus === "success"
                      ? "Publish Complete!"
                      : publishStatus === "error"
                      ? "Publish Failed"
                      : "Publishing to GitHub..."}
                  </h4>
                  <p className="text-xs text-white/50">
                    {publishStatus === "success"
                      ? "GitHub Actions will trigger deployment."
                      : publishStatus === "error"
                      ? "Please resolve the error below."
                      : "Committing changes via GitHub REST API."}
                  </p>
                </div>
              </div>

              <div className="rounded-xl border border-white/10 bg-black/40 p-3.5 font-mono text-[0.72rem] text-white/70 mb-4">
                <p>{publishLog}</p>
                {publishError && <p className="text-red-400 mt-1">{publishError}</p>}
              </div>

              {publishStatus === "success" && (
                <div className="mb-4 rounded-xl border border-[#c5ff41]/20 bg-[#c5ff41]/5 p-3 text-xs text-[#c5ff41]">
                  <p className="font-bold">Deployment Notice:</p>
                  <p className="mt-1 text-white/70">
                    GitHub Actions is now rebuilding and deploying your updated portfolio to GitHub Pages. It will be live in 1-2 minutes.
                  </p>
                </div>
              )}

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setPublishStatus("idle")}
                  disabled={publishStatus === "committing" || publishStatus === "fetching"}
                  className="rounded-full bg-white px-5 py-2 text-xs font-black text-[#151312] hover:bg-[#c5ff41] transition disabled:opacity-40"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
