import { useEffect, lazy, Suspense } from "react";
import { IconCloudOffline16 } from "./assets/icons";
import toast, { useToasterStore } from "react-hot-toast";
import { Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header";
import MLoader from "./components/MLoader";
const HomePage = lazy(() => import("./pages/Home/home"));
const AboutPage = lazy(() => import("./pages/About"));
import Contact from "./pages/Contact";
const Editor =  lazy(() => import("./pages/Blog/editor"))
const SkillsPage = lazy(() => import("./pages/Skills/Skills"));
const BlogPage = lazy(() => import("./pages/Blog"));
const ViewerPage = lazy(() => import("./pages/Blog/viewer"));

function App() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [pathname]);

  useEffect(() => {
    if (!navigator.onLine) {
      toast("You are currently offline!", {
        style: {
          backgroundColor: "gray",
          color: "#fff",
        },
        icon: <IconCloudOffline16 />,
      });
    }
  }, [pathname]);

  const { toasts } = useToasterStore();

  const TOAST_LIMIT = 1;
  useEffect(() => {
    toasts
      .filter((t) => t.visible)
      .filter((_, i) => i >= TOAST_LIMIT)
      .forEach((t) => toast.dismiss(t.id));
  }, [toasts]);

  return (
    <>
      <Suspense fallback={<MLoader/>}>
        <>
          <Header />
          <Contact/>
        </>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/editor" element={<Editor/>} />
          <Route path="/skills" element={<SkillsPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/article/:slug" element={<ViewerPage />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
