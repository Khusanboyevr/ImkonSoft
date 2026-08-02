import { Typography, Button, IconButton } from "@material-tailwind/react";
import Image from "next/image";

const CURRENT_YEAR = new Date().getFullYear();

// Simple inline SVG icons for social media (since @heroicons doesn't include brand icons)
function TelegramIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
    </svg>
  );
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}


export function Footer() {
  return (
    <footer className="px-8 pb-5 pt-16 md:pt-20">
      <div className="container flex flex-col mx-auto">
        <div className="flex !w-full py-10 mb-5 md:mb-20 flex-col justify-center !items-center bg-gray-900 max-w-6xl mx-auto rounded-2xl p-5 ">
          <Typography
            className="text-2xl md:text-3xl text-center font-bold "
            color="white"
          >
            Biz bilan loyihangizni boshlang!
          </Typography>
          <Typography
            color="white"
            className=" md:w-7/12 text-center my-3 !text-base"
          >
            G&apos;oyangizni haqiqatga aylantirish va bepul professional konsultatsiya olish uchun biz bilan bog'laning.
          </Typography>
          <div className="flex w-full md:w-fit gap-3 mt-2 flex-col md:flex-row">
            <a href="#contact">
              <Button
                color="white"
                size="lg"
                className="btn-shimmer font-bold rounded-full px-8 py-3.5 shadow-xl transition-all duration-300 transform hover:scale-105 hover:bg-cyan-50"
              >
                Bog&apos;lanish
              </Button>
            </a>
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-center !justify-between">
          <div className="flex items-center gap-2">
            <Image
              src="/image/logo.png?v=3"
              alt="ImkonSoft logo"
              width={32}
              height={32}
              className="h-8 w-8 object-contain"
            />
            <Typography
              as="a"
              href="#"
              variant="h6"
              className="text-gray-900"
            >
              ImkonSoft
            </Typography>
          </div>
          <div className="flex w-fit justify-center gap-2 mt-4 md:mt-0">
            <a href="https://t.me/imkonsoft" target="_blank" rel="noopener noreferrer">
              <IconButton size="sm" color="gray" variant="text">
                <TelegramIcon className="h-5 w-5" />
              </IconButton>
            </a>
            <a href="https://instagram.com/imkonsoft" target="_blank" rel="noopener noreferrer">
              <IconButton size="sm" color="gray" variant="text">
                <InstagramIcon className="h-5 w-5" />
              </IconButton>
            </a>
            <a href="https://linkedin.com/company/imkonsoft" target="_blank" rel="noopener noreferrer">
              <IconButton size="sm" color="gray" variant="text">
                <LinkedInIcon className="h-5 w-5" />
              </IconButton>
            </a>
          </div>
        </div>
        <Typography
          color="blue-gray"
          className="text-center mt-12 font-normal !text-gray-700"
        >
          &copy; {CURRENT_YEAR} ImkonSoft. Barcha huquqlar himoyalangan.
        </Typography>
      </div>
    </footer>
  );
}

export default Footer;
