import "../globals.css";
import Header from "~/components/Header/Header";
import Footer from "~/components/Footer/Footer";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <div className="pattern-bg"
      >
        <div className="bg-gradient-to-t from-primary-200/90 to-primary-50  relative">
          <Header />
          {children}
          <Footer />
        </div>
      </div>
    </NextIntlClientProvider>
  );
}
