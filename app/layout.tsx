// @ts-nocheck
import type { Metadata } from "next";
import Head from "next/head";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title:
    "临时邮箱、邮箱、电子邮件、email、一次性临时电子邮件服务，随机临时邮箱、十分钟邮箱（10分钟)、临时邮、临时Email、快速注册Email、测试邮箱 -- 王天柱的blog",
  description:
    "在线生成临时邮箱、十分钟邮箱（10分钟)、快速注册Email、临时邮箱提供临时、匿名、免费、安全、一次性的电子邮件地址，保护您的个人电子邮件地址免受垃圾邮件的侵害。",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Head>
        <script>var _hmt = _hmt || [];</script>
        <script async src="https://hm.baidu.com/hm.js?26eaea5e395d89d9ca7e6876d7021d51" />
      </Head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
