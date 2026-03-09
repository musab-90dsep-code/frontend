import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Protibar path change hole window ekdom upore (0, 0) chole jabe
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default ScrollToTop;