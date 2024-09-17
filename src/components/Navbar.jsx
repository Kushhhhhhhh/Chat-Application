'use client';
import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ThemeBtn } from "./theme-btn.js";
import { Button } from "./ui/button.jsx";
import { useUser, SignInButton, SignOutButton, UserButton, SignedOut, SignedIn } from '@clerk/nextjs';

const Navbar = () => {
  const { isSignedIn } = useUser();

  const renderAuthButtons = () => (
    isSignedIn ? (
      <>
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </>
    ) : (
      <SignInButton>
        <button className="transition-transform transform duration-300 hover:scale-105 hover:text-gray-700 dark:hover:text-gray-300 hover:font-semibold">
          Sign In
        </button>
      </SignInButton>
    )
  );

  return (
    <nav className="p-4 bg-background/50 sticky top-0 backdrop-blur border-b z-10">
      <div className="container mx-auto flex justify-between items-center px-8">
        <div className="flex items-center space-x-2">
          <Link
            className="text-2xl font-bold hover:text-gray-700 dark:hover:text-gray-200"
            href="/"
          >
            Chat App
          </Link>
        </div>
        <div className="space-x-4 hidden md:flex items-center">
          <Link
            href="/"
            className="transition-transform transform duration-300 hover:scale-105 hover:text-gray-700 dark:hover:text-gray-300 hover:font-semibold"
          >
            Home
          </Link>
          <Link
            href="/chat"
            className="transition-transform transform duration-300 hover:scale-105 hover:text-gray-700 dark:hover:text-gray-300 hover:font-semibold"
          >
            Chat
          </Link>

          <ThemeBtn />
          
          {/* Conditional rendering based on authentication status */}
          {renderAuthButtons()}
        </div>

        <div className="md:hidden">
          <span className="mx-4">
            <ThemeBtn />
          </span>
          <Sheet>
            <SheetTrigger className="text-2xl">☰</SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle className="font-bold my-4">KushBlog</SheetTitle>
                <div className="flex flex-col gap-6">
                  <Link href="/">Home</Link>
                  <Link href="/chat">Chat</Link>
                  <ThemeBtn />
                  {isSignedIn ? (
                    <SignOutButton>
                      <Button className="mt-2">
                        Sign Out
                      </Button>
                    </SignOutButton>
                  ) : (
                    <SignInButton>
                      <Button className="mt-2">
                        Sign In
                      </Button>
                    </SignInButton>
                  )}
                </div>
              </SheetHeader>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;