import Link from "next/link";

import LinkedinIcon from "../icons/LinkedinIcon";
import GithubIcon from "../icons/GithubIcon";
import XIcon from "../icons/XIcon";

export default function Footer() {
  return (
    <footer className="my-6 flex h-full flex-col items-center justify-center gap-3">
      <p>
        App hecha por
        <Link
          className="hover:text-bold  cursor-pointer p-1 transition-all hover:text-rose-600"
          href="https://www.linkedin.com/in/feralarcon1995/"
          target="_blank"
        >
          Fernando Alarcon
        </Link>
      </p>
      <Link
        className="flex items-center justify-center gap-3"
        href="https://github.com/feralarcon1995/teamcy"
        target="_blank"
      >
        Repositorio, por si te interesa colaborar:
        <GithubIcon className="cursor-pointer p-1 transition-all hover:rounded-full hover:text-rose-600 hover:ring-1 hover:ring-rose-600 " />
      </Link>
      <div className="flex flex-col items-center justify-center gap-3">
        <p className="text-center">Tambien podes encontrarme en:</p>
        <div className="flex items-center justify-center gap-3">
          <Link href="https://twitter.com/medicenferpy" target="_blank">
            <XIcon className="cursor-pointer p-1 transition-all hover:rounded-full hover:text-rose-600 hover:ring-1 hover:ring-rose-600 " />
          </Link>
          <Link href="https://www.linkedin.com/in/feralarcon1995/" target="_blank">
            <LinkedinIcon className="cursor-pointer p-1 transition-all hover:rounded-full hover:text-rose-600 hover:ring-1 hover:ring-rose-600 " />
          </Link>
        </div>
      </div>
      <p> © {new Date().getFullYear()} teamcy. </p>
    </footer>
  );
}
