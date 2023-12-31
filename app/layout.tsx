// @ts-nocheck
import type { Metadata } from "next";
import Head from "next/head";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title:
    "临时邮箱 Temp Email -- 王天柱的blog",
  description:
    "在线生成临时邮箱（10分钟)，保护您的个人电子邮件地址免受垃圾邮件的侵害。",
  keywords: "邮箱、电子邮件、email、一次性临时电子邮件服务，随机临时邮箱、十分钟邮箱（10分钟)、临时邮、临时Email、快速注册Email、测试邮箱"
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Head>
      </Head>
      <body className={inter.className}>
        {children}
        <script>var _hmt = _hmt || [];</script>
        <script async src="https://hm.baidu.com/hm.js?26eaea5e395d89d9ca7e6876d7021d51" />
      </body>
    </html>
  );
}
