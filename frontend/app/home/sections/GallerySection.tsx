import Link from "next/link";
import { Button } from "@/components/ui/buttons/button";

export function GallerySection() {
  return (
    <section className="bg-white py-20">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-900">학생 작품 갤러리</h2>
          <p className="text-lg text-gray-600">우리 학생들이 만든 멋진 프로젝트를 만나보세요</p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="group overflow-hidden rounded-xl bg-white shadow-lg transition-all hover:shadow-2xl">
            <div className="aspect-video overflow-hidden">
              <img src="/home/student-robot-project.jpg" alt="로봇 프로젝트" className="h-full w-full object-cover transition-transform group-hover:scale-110" />
            </div>
            <div className="p-4">
              <h3 className="mb-1 font-semibold">자율주행 로봇</h3>
              <p className="text-sm text-gray-600">중학생 김OO 학생 작품</p>
            </div>
          </div>

          <div className="group overflow-hidden rounded-xl bg-white shadow-lg transition-all hover:shadow-2xl">
            <div className="aspect-video overflow-hidden">
              <img src="/home/mobile-app-interface.png" alt="앱 프로젝트" className="h-full w-full object-cover transition-transform group-hover:scale-110" />
            </div>
            <div className="p-4">
              <h3 className="mb-1 font-semibold">환경 보호 앱</h3>
              <p className="text-sm text-gray-600">초등학생 이OO 학생 작품</p>
            </div>
          </div>

          <div className="group overflow-hidden rounded-xl bg-white shadow-lg transition-all hover:shadow-2xl">
            <div className="aspect-video overflow-hidden">
              <img src="/home/smart-home-iot-device.jpg" alt="IoT 프로젝트" className="h-full w-full object-cover transition-transform group-hover:scale-110" />
            </div>
            <div className="p-4">
              <h3 className="mb-1 font-semibold">스마트 홈 시스템</h3>
              <p className="text-sm text-gray-600">고등학생 박OO 학생 작품</p>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <Button variant="outline" size="lg" asChild>
            <Link href="/gallery">
              더 많은 작품 보기
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}


