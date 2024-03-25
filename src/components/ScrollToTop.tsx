import { useEffect } from "react";
import { useLocation } from "react-router-dom";
export default function ScrollToTop() {
  //automatically scrolling to the top on any page load
  const { pathname } = useLocation();

  //scrolling to top when path name changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return <div></div>;
}
