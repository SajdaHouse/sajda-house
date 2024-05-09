import { BsTelephone, BsEnvelope } from "react-icons/bs";
import Image from "next/image";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
export default function Footer() {
  return (
    <footer>
      <div className="w-full px-4">
        <Accordion type="single" dir="rtl" collapsible className="max-w-4xl mx-auto">
          <AccordionItem value="item-1">
            <AccordionTrigger>من نحن</AccordionTrigger>
            <AccordionContent>
              بيت سجدة متجر واحد حيث يمكنك شراء كل شيء من الأثاث والديكورات
              المنزلية وأكثر! نحن نحل باستمرار “المنزل” – لدى بيت سجدة أكبر
              اختيار لتصميم بنقرة واحدة. الراحة والتقنية التنبؤية والنهج
              المتمحور حول العميل.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>التواصل معنا</AccordionTrigger>
            <AccordionContent>
              <span dir="ltr">
                +20 1005187712 <br /> +20 1005187712
              </span>
              <br /> العنوان : الغربيه طنطا – طريق طنطا شبرا -أمام مدرسه عمر بن
              عبدالعزيز <br /> mohamedelsayedm1922@gmail.com
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>مواعيد العمل</AccordionTrigger>
            <AccordionContent>
              يوميا من الساعة 10 صباحا حتى الساعة 7 مساءا عدا يوم الجمعة عطلة
              رسمية
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger>سياسة الخصوصية</AccordionTrigger>
            <AccordionContent>
              سنطلب منك عندما نحتاج إلى معلومات تسمح لنا بالأتصال بك ، نستخدمها
              لأربعة أغراض أساسية لتسهيل استخدام الموقع من خلال عدم الأضطرار إلى
              ادخال المعلومات أكثر من مرة لمساعدتك فى العثور على المعلومات
              والمنتجات بسرعة ولمساعدتنا فى إنشاء محتوى تحتاجه و لتنبيهك إلى
              العروض الخاصة والمنتجات الجديدة الأخرى
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-5">
            <AccordionTrigger>سياسة الشحن</AccordionTrigger>
            <AccordionContent>
              تم شحن 100 % من الطلبات فى عضون 6 إلى 9 أيام فى حالة تسليم طلبات
              السراير والكراسي
              <br />
              وفى حالة تسليم اى منتج اخر من 7 إإلى 14 يوم عمل .
              <br />
              سيتواصل معك أحد فريق الشحن لدينا إلى أن تسلم طلبك
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-6">
            <AccordionTrigger>سياسة الإرجاع</AccordionTrigger>
            <AccordionContent>
              شكرا على شراء منتجاتنا نقدم ضمانا لإسترداد الأموال بالكامل على
              جميع عمليات الشراء التى تتم على موقعنا الإلكترونى ، ولكن بشروط
              معينة . ندعوك لقراءة الشروط الموضحة بمزيد من التفاصيل ، لمعرفة
              الحالة التى تنطبق على حالتك إذا لم تكن راضيا عن المنتج الذى
              اشتريته منا ، فيرجى إخبارنا . تمنحك سياسة الإرجاع والاسترداد
              الخاصة بنا 14 يوما لإرجاع الطلب أو استبداله ، أنت مؤهل لإسترداد
              الأموال فى غضون 14 يوما من الشراء ، وستدفع فقط رسوم الشحن .
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-7">
            <AccordionTrigger>سياسة الضمان</AccordionTrigger>
            <AccordionContent>
              ضمان 12 شهر ضد عيوب الصناعة
              <br />
              استرداد المبلغ بالكامل إذا كان لدي المنتج عيوب صناعه
              <br />
              فتره الضمان هي فتره طويله تتمثل بأن جوده المنتج هي افضل جوده ولذلك
              نحن نقدم افضل خدمه تتمكن من صلاحيه المنتج
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-8">
            <AccordionTrigger>طرق وسياسات الدفع</AccordionTrigger>
            <AccordionContent>
              فودافون كاش رقم : 01005187712
              <br />
              تحويل بنكى على البنك الاهلى فرع طنطا
              <br />
              حساب رقم : 3815000774901900010
              <br />
              IBAN number : EG830003038150007749019000100
              <br />
              سوفت كود : NBEGEGCX381
              <br />
              إنستا باى : 01005187712
              <br />
              سياسات الدفع :
              <br />
              بيتم دفع مقدم تعاقد بنسبه 25 % من قيمه الاوردر في حاله إلغاء الحجز
              قبل تنفيذ الاوردر الخاص بالعميل بيتم استرجاع المبلغ للعميل بالكامل
              وفي حاله توصيل الاوردر للعميل ولدي المنتج عيوب صناعه أو غير راضي
              عن المنتج بخصوص الجوده أو الكوالتي بيتم استرجاع المبلغ للعميل
              بالكامل وفي حاله إلغاء الاوردر بعد التنفيذ بيتم خصم المبلغ للشركة
              تعويضاً لتصنيع المنتج حسب إن جميع المنتجات تصنع حسب الطلب شكراً
              لاختيارك sajda house 😀
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      <div className="bg-slate-100 font-medium text-center">
        <div className="container py-12 flex flex-col md:flex-row gap-7 md:gap-14">
          <div className="flex md:flex-col flex-row items-center justify-center sm:gap-10 gap-5">
            {/* -------------------- logo -------------------- */}

            <div className="flex flex-col items-center">
              <Image
                src="/store/Logo.png"
                width="170"
                height="98"
                alt="Logo"
              />
              <p className="text-xl text-[#21A3E1]">ثقتكم أمانة</p>
            </div>
            {/* -------------------- follow -------------------- */}

            <div className="flex flex-col items-center gap-2">
              <p className="text-teal-500">تابعنا علي</p>
              <div className="flex gap-3">
                <Link
                  href="https://www.facebook.com/sagdaroomm?locale=ar_AR"
                  target="_blank"
                >
                  <Image
                    src="/store/Facebook.png"
                    width="30"
                    height="30"
                    alt="Facebook"
                    className="sm:size-auto size-[9vw]"
                  />
                </Link>
              </div>
            </div>
          </div>

          <div className="flex flex-col flex-grow items-center gap-8">
            {/* -------------------- contact -------------------- */}

            <div className="flex items-center pt-3 gap-7 justify-center max-[450px]:flex-col">
              <p className="text-2xl text-teal-700 ml-5">معلومات التواصل</p>
              <div className="flex gap-7  justify-center flex-col lg:flex-row lg:items-center">
                <div className="flex gap-3 items-center">
                  <div className="w-12 h-12 flex justify-center items-center text-2xl bg-white rounded-full shadow">
                    <BsEnvelope className="text-teal-300"></BsEnvelope>
                  </div>
                  <div>
                    <p className="text-sm text-teal-500 text-start">
                      البريد الالكتروني
                    </p>
                    <p className="text-xl" dir="ltr">
                      sagdaroom@gmail.com
                    </p>
                  </div>
                </div>
                <div className="flex gap-3 items-center">
                  <div className="w-12 h-12 flex justify-center items-center text-2xl bg-white rounded-full shadow">
                    <BsTelephone className=" text-teal-300"></BsTelephone>
                  </div>
                  <div>
                    <p className="text-sm text-teal-500 text-start">
                      رقم الهاتف
                    </p>
                    <p className="text-xl" dir="ltr">
                      +20 01005187712
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:w-1/2 w-3/4 border-t border-gray-300"></div>

            <div className="flex justify-between w-full xl:px-16 lg:flex-row flex-col">
              {/* -------------------- news subscreption -------------------- */}

              <div className="flex flex-col items-center">
                <p className="text-2xl text-teal-700 mb-1">
                  اشترك في النشرة الاخبارية
                </p>
                <p className="text-lg text-teal-400 mb-4">
                  كن اول من يعرف عن عروضنا ومنتجاتنا الجديدة
                </p>
                <div className="max-w-xs w-full flex items-stretch rounded overflow-hidden shadow-[0px_4px_10px_0px_rgba(0,147,233,0.1)]">
                  <p className="px-4 py-3 bg-[#0093E9] font-bold text-white text-base select-none hover:bg-[rgb(0,137,223)] active:bg-[rgb(0,117,203)] cursor-pointer duration-150">
                    اشتراك
                  </p>
                  <input
                    type="email"
                    className="flex-grow px-3 focus:outline-none text-right placeholder:text-right placeholder:text-sm"
                    dir="ltr"
                    placeholder="اكتب البريد الالكتروني الخاص بك"
                  />
                </div>
              </div>

              {/* -------------------- info -------------------- */}

              <div className="flex flex-col items-center mt-10 lg:mt-0">
                <p className="text-base text-teal-700 mb-1">
                  حقوق الملكية محفوظة لـ | بيت سجدة للأثاث ©
                </p>
                <p className="text-base text-teal-700 ">
                  تم تصميم الموقع بواسطة | كريم يوسف
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
