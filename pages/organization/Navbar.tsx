import Link from 'next/link';

export const Navbar = () => {
  return (
    <>
      <nav>
        <label className='NavbarLabel'>Organization</label>
        <button className='NavbarButton' id='LogInButton'>Log In</button>
        <button className='NavbarButton' id='SignInButton'>Sign In</button>
      </nav>
    </>
  );
};