export function createEmail({
  values,
  id,
}: {
  values: {
    products: {
      id: number;
      title: string;
      image: string;
      price: number;
      quantity: number;
    }[];
    info: {
      username: string;
      governorate: string;
      city: string;
      address: string;
      phone: string;
      email?: string | undefined;
      additions?: string | undefined;
    };
  };
  id: number;
}) {
  let productsPrice = 0;
  for (const product of values.products) {
    productsPrice += product.price * product.quantity;
  }
  let shipping = 0;
  let taxes = 0;
  if (values.products.length > 0) {
    shipping = 0;
    taxes = 0;
  }
  const totalPrice = productsPrice + shipping + taxes;
  return `<!DOCTYPE html>
  <html lang="ar">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>تم تأكيد المنتج الخاص بك</title>
    </head>
    <body
      style="
        font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI',
          Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue',
          sans-serif;
        background-color: #f5f7fa;
      "
      dir="rtl"
    >
      <table width="100%" border="0">
        <tr>
          <td colspan="3"><img src="https://vtjclpwgljeqcdjmitvj.supabase.co/storage/v1/object/public/store/Logo.png" width="106" height="61" /></td>
        </tr>
        <tr>
          <td
            colspan="3"
            style="
              width: 100%;
              text-align: center;
              font-size: 1.5rem;
              color: #23a4e0;
            "
          >
            شكرا لثقتك في بيت سجدة
          </td>
        </tr>
        <tr>
          <td colspan="3" height="10px"></td>
        </tr>
        <tr>
          <td
            colspan="3"
            style="
              width: 100%;
              text-align: center;
              font-size: 1.125rem;
              color: #7f7f7f;
            "
          >
            ملخص الطلب :
          </td>
        </tr>
        <tr>
          <td colspan="3" height="10px"></td>
        </tr>
        <!-- ---------- Products ---------- -->
        <tr>
          <td colspan="3">
            <center>
              <table
                width="98%"
                style="background-color: white; border-radius: 20px"
              >
              ${values.products
                .map(
                  (product) => `<tr>
              <td colspan="1" style="padding: 10px" width="100px">
                <img
                  src="${product.image}"
                  width="100px"
                  height="100px"
                  style="border-radius: 10px"
                />
              </td>
              <td colspan="1">
                <table width="100%" height="100%">
                  <tr>
                    <td
                      colspan="1"
                      style="font-size: 1.125rem; padding: 2px 0px"
                    >
                      ${product.title}
                    </td>
                  </tr>
                  <tr>
                    <td
                      colspan="1"
                      style="
                        font-size: 0.9rem;
                        color: #7f7f7f;
                        padding: 2px 0px;
                      "
                    >
                      الكمية : ${product.quantity}
                    </td>
                  </tr>
                  <tr>
                    <td
                      colspan="1"
                      style="
                        font-size: 0.9rem;
                        color: #7f7f7f;
                        padding: 2px 0px;
                      "
                    >
                      سعر القطعة : ${product.price.toLocaleString("en-us")} ج.م
                    </td>
                  </tr>
                </table>
              </td>
            </tr>`
                )
                .flatMap((item, index) =>
                  index === values.products.length - 1
                    ? [item]
                    : [
                        item,
                        `<tr>
              <td colspan="3">
                <center>
                  <table width="70%">
                    <tr>
                      <td
                        colspan="1"
                        style="border-bottom: 1px solid #e6e6e6"
                      ></td>
                    </tr>
                  </table>
                </center>
              </td>
            </tr>`,
                      ]
                )
                .join("")}
              </table>
            </center>
          </td>
        </tr>
        <!-- ---------- Summary And Info ---------- -->
        <tr>
          <td colspan="3">
            <center>
              <table width="98%" style="table-layout: auto">
                <!-- ---------- Summary ---------- -->
                <tr>
                  <td colspan="2" width="40%" style="vertical-align: super">
                    <table
                      width="100%"
                      style="
                        background-color: white;
                        border-radius: 20px;
                        padding: 10px;
                      "
                    >
                      <tr>
                        <td colspan="2">
                          <center style="padding: 5px 0px">ملخص الطلب</center>
                        </td>
                      </tr>
                      <tr>
                        <td
                          colspan="1"
                          style="
                            color: #5a5a5a;
                            width: 1%;
                            white-space: nowrap;
                            font-size: 0.9rem;
                            padding: 2px 0px;
                          "
                        >
                          عدد المنتجات :
                        </td>
                        <td colspan="1" style="color: #5a5a5a; font-size: 0.9rem">
                          ${values.products.length}
                        </td>
                      </tr>
                      <tr>
                        <td
                          colspan="1"
                          style="
                            color: #5a5a5a;
                            width: 1%;
                            white-space: nowrap;
                            font-size: 0.9rem;
                            padding: 2px 0px;
                          "
                        >
                          سعر المنتجات :
                        </td>
                        <td colspan="1" style="color: #5a5a5a; font-size: 0.9rem">
                          ${productsPrice.toLocaleString("en-us")} ج.م
                        </td>
                      </tr>
                      <tr>
                        <td
                          colspan="1"
                          style="
                            color: #5a5a5a;
                            width: 1%;
                            white-space: nowrap;
                            font-size: 0.9rem;
                            padding: 2px 0px;
                          "
                        >
                          تكلفة الشحن :
                        </td>
                        <td colspan="1" style="color: #5a5a5a; font-size: 0.9rem">
                        مجاني
                        </td>
                      </tr>
                      <tr>
                        <td
                          colspan="1"
                          style="
                            color: #5a5a5a;
                            width: 1%;
                            white-space: nowrap;
                            font-size: 0.9rem;
                            padding: 2px 0px;
                          "
                        >
                          المجموع :
                        </td>
                        <td colspan="1" style="color: #5a5a5a; font-size: 0.9rem">
                          ${totalPrice.toLocaleString("en-us")} ج.م
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <!-- ---------- Info ---------- -->
                <tr>
                  <td colspan="3" style="vertical-align: super">
                    <table
                      width="100%"
                      style="
                        background-color: white;
                        border-radius: 20px;
                        padding: 10px;
                      "
                    >
                      <tr>
                        <td colspan="2">
                          <center style="padding: 5px 0px">بيانات الطلب</center>
                        </td>
                      </tr>
                      <tr>
                        <td
                          colspan="1"
                          style="
                            color: #5a5a5a;
                            width: 1%;
                            white-space: nowrap;
                            font-size: 0.9rem;
                            padding: 2px 0px;
                          "
                        >
                          رقم الطلب :
                        </td>
                        <td colspan="1" style="color: #5a5a5a; font-size: 0.9rem">
                          A056-20-${id}
                        </td>
                      </tr>
                      <tr>
                        <td
                          colspan="1"
                          style="
                            color: #5a5a5a;
                            width: 1%;
                            white-space: nowrap;
                            font-size: 0.9rem;
                            padding: 2px 0px;
                          "
                        >
                          اسم العميل :
                        </td>
                        <td colspan="1" style="color: #5a5a5a; font-size: 0.9rem">
                          ${values.info.username}
                        </td>
                      </tr>
                      <tr>
                        <td
                          colspan="1"
                          style="
                            color: #5a5a5a;
                            width: 1%;
                            white-space: nowrap;
                            font-size: 0.9rem;
                            padding: 2px 0px;
                          "
                        >
                          عنوان الشحن :
                        </td>
                        <td colspan="1" style="color: #5a5a5a; font-size: 0.9rem">
                        ${
                          values.info.address +
                          " , " +
                          values.info.city +
                          " , " +
                          values.info.governorate
                        }
                        </td>
                      </tr>
                      <tr>
                        <td
                          colspan="1"
                          style="
                            color: #5a5a5a;
                            width: 1%;
                            white-space: nowrap;
                            font-size: 0.9rem;
                            padding: 2px 0px;
                          "
                        >
                          رقم الهاتف :
                        </td>
                        <td colspan="1" style="color: #5a5a5a; font-size: 0.9rem">
                          ${values.info.phone}
                        </td>
                      </tr>
                      <tr>
                        <td
                          colspan="1"
                          style="
                            color: #5a5a5a;
                            width: 1%;
                            white-space: nowrap;
                            font-size: 0.9rem;
                            padding: 2px 0px;
                          "
                        >
                          البريد الالكتروني :
                        </td>
                        <td colspan="1" style="color: #5a5a5a; font-size: 0.9rem">
                          ${values.info.email}
                        </td>
                      </tr>
                      <tr>
                        <td
                          colspan="1"
                          style="
                            color: #5a5a5a;
                            width: 1%;
                            white-space: nowrap;
                            font-size: 0.9rem;
                            padding: 2px 0px;
                          "
                        >
                          الملاحظات :
                        </td>
                        <td colspan="1" style="color: #5a5a5a; font-size: 0.9rem">
                          ${values.info.additions ?? "لا يوجد"}
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </center>
          </td>
        </tr>
      </table>
    </body>
  </html>
  `;
}
