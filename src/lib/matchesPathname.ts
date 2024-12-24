// from github issue: https://gist.github.com/tomfa/f925366cd036bb0d4af5bbd8397c84ae

function removeTrailingSlash(pathname: string) {
  if (pathname.endsWith("/")) {
    return pathname.slice(0, -1);
  }
  return pathname;
}

export const matchesPathname = (asPath: string, pathname: string) => {
  if (asPath === pathname) {
    return true;
  }
  const baseAsPath = removeTrailingSlash(asPath.split("?")[0] as string);
  const basePathname = removeTrailingSlash(pathname.split("?")[0] as string);
  if (baseAsPath === basePathname) {
    return true;
  }
  const basePathRegex = new RegExp(
    `^${basePathname.replace(/(\[[a-zA-Z0-9-]+\])+/g, "[a-zA-Z0-9-]+")}$`
      .replace(/\[\[\.\.\.[a-zA-Z0-9-]+\]\]/g, "?.*")
      .replace(/\[\.\.\.[a-zA-Z0-9-]+\]/g, ".*")
  );
  return basePathRegex.test(baseAsPath);
};
