const env = process.env.NODE_ENV;
export function consoleLog(...props: any[]) {
  if (env == "development") {
    console.log(
      "\x1b[33m%s\x1b[0m",
      new Date(Date.now()).toISOString().replace("T", " ").slice(0, 23),
      "-",
      "\x1b[34m",
      ...props,
      "\x1b[0m"
    );
  }
}

export function consoleSuccess(...props: any[]) {
  if (env == "development") {
    console.log(
      "\x1b[33m%s\x1b[0m",
      new Date(Date.now()).toISOString().replace("T", " ").slice(0, 23),
      "-",
      "\x1b[32m",
      ...props,
      "\x1b[0m"
    );
  }
}

export function consoleError(...props: any[]) {
  if (env == "development") {
    console.log(
      "\x1b[33m%s\x1b[0m",
      new Date(Date.now()).toISOString().replace("T", " ").slice(0, 23),
      "-",
      "\x1b[31m",
      ...props,
      "\x1b[0m"
    );
  }
}
