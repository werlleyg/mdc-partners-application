import Head from "next/head";

// types
interface ICustomHead {
  title?: string;
}

export function CustomHead({ title }: ICustomHead) {
  return (
    <Head>
      <title>{title} Dev Mid Test - Werlley Ponte</title>
      <meta
        name='description'
        content='Project developed with the purpose of meeting the requirements for a mid-level developer test. 💻✨'
      />
      <meta
        name='viewport'
        content='width=device-width, initial-scale=1, user-scalable=no'
      />
      <link rel='icon' href='/favicon.ico' />
    </Head>
  );
}
