import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  debug: true,
  fallbackLng: "en",
  interpolation: {
    escapeValue: false, // not needed for react as it escapes by default
  },
  // language resources
  resources: {
    en: {
      translation: {
        logo: "eng",
        next: "Next",
        search: "Search",
        back: "Back",
        previous: "Previous",
        email: "Email",
        password: "Password",
        confirmPassword: "Confirm Password",
        or: "or",
        step: "step",
        firstName: "Fist Name",
        lastName: "Last Name",
        country: "Country",
        city: "City",
        street: "Street",
        account: "Account",
        comment: "Comment",
        earn: "Earned",
        edit: "Edit",
        save: "Save",
        cancel: "Cancel",
        upload: "Upload",
        messages: "Messages",
        clickHere: "click here",
        post: "Post",

        //HomePage
        homeWelcome:
          "Welcome to the best place to buy and sell gifts for you and your loved ones. Discover a wide selection of unique items that will make any occasion special.",
        homeIntro: "Buy and Sell Gifts",
        homeTxtGift: "Gifts",
        homeTxtTestimonials: "Testimonials",
        homeTxtSignup: "Join",
        homeTxtSignin: "Login",
        homeTxtBlog: "Blogs",
        homeTxtAbout: "About",
        homeTxtShop: "Shop",

        //AboutPage
        aboutHeader: "MeritaGifts",
        aboutBody1:
          "Welcome to MeritaGifts, the marketplace with an innovative twist. At MeritaGifts, we believe in ensuring a secure and trustworthy buying and selling experience for our users.",
        aboutBody2:
          "We have added a unique feature that sets us apart from traditional marketplaces. When you make a purchase on MeritaGifts, the seller's payment is held in escrow until you, the buyer, approve the delivery of the item. This means that you have full control over the transaction and can ensure that you are satisfied with your purchase before the seller receives their payment.",
        aboutBody3:
          "This innovative approach provides an extra layer of protection for buyers, giving you peace of mind and the confidence to shop with us. We understand how important it is to receive the perfect gift and want to ensure that you are completely satisfied before finalizing the transaction.",
        aboutBody4:
          "For sellers, this feature guarantees that they will receive payment only when the buyer is happy with their purchase. It encourages sellers to provide high-quality products and excellent customer service, ensuring a positive experience for everyone involved.",
        aboutBody5:
          "At MeritaGifts, we strive to create a transparent and secure marketplace where buying and selling gifts is a seamless and enjoyable process. Join our community today and discover the convenience and peace of mind that comes with our unique approval-based delivery system.",
        aboutTxtContact: "Contacts",
        aboutTxtPhone: "Phone Number",

        //login
        LoginTxt: "Login",
        PasswordShowTxt: "Show password",
        forgetPasswordTxt: "Forget password",
        heyTxt: "Hey, Login to MeritaGifts",
        bodyLoginTxt:
          "The bast place to buy and sell gifts for you an your loved one's.please create account by entering you information and start you journey with us.",

        //signup
        signupIntroTxt: "Welcome, to MeritaGifts",
        signupBodyTxt:
          "The bast place to buy and sell gifts for you an your loved one's.please create account by entering you information and start you journey with us.",
        page1Header: "Basic Info",
        page2Header: "Location Info",

        //type
        buyAGift: "Buy a Gift",
        sellAGift: "Sell a Gift",

        //request
        requestTxtPassword: "Reset your password",
        requestTxtBtn: "Reset Password",

        //resetpage
        resetPasswordIntro: "New Password",
        resetPasswordBtn: "Save Password",

        //blogDisplay
        loginToComment: "Login To Comment",

        //sellerNav
        navProfileTXt: "Profile",
        navOrderTxt: "Order",
        navMessageTxt: "Message",
        navGiftsTxt: "Gifts",
        navWithdrawTxt: "Withdraws",

        //sellergifts
        sellerPostAGift: "Post a gift",
        sellerGiftPostTxt: "Post a Gift",
        SellerGiftsPostSuccess: "Product successfully posted",
        sellerGiftsBgRemover: "Tip use background remover for improved result.",
        sellerGiftsBgRemovermobile: "Background remover.",
        giftName: "Gift Name",
        giftPrice: "Gift Price",
        giftLocation: "Gift Location",
        giftDescription: "Description",
        giftCategory1: "Sofabed",
        giftCategory2: "CoffeeTabler",
        giftCategory3: "KitchenCabinate",
        giftCategory4: "DiningTable",
        giftCategory5: "WellBed",
        giftCategory6: "NormalBeds",
        giftCategory7: "DressingTable",
        giftCategory8: "others",

        //sellerwithdraw
        withdrawGetPaid: "GET PAID",
        withdrawAvailableBalance: "Available balance",
        withdrawaccountName: "Account Name",
        withdrawaccountNumber: "Account Number",
        withdrawBank: "Bank",
        withdrawwithDrawRequest: "Withdraw Request",
        withdrawTransaction: "Withdraw Transactions",

        //buyerpage
        buyerPriceGift: "Price of gift",
        buyerGreaterThan1000: "Greater than 1000birr",
        buyerLessThan1000: "Less than 1000birr",
        buyerLessThan500: "Less than 500birr",
        buyer1to100: "1birr to 100birr",
        buyerAllPrice: "All price",
        buyerDateOfGift: "Date of gift",
        buyerLessThan24: "Less than 24 hours",
        buyerLessThanAWeek: "Less than a week",
        buyerLessThanAMonth: "Less than a month",
        buyerLessThanAYear: "Less than a year",
        buyerGreaterThanAYear: "Greater than a year",
        buyerAllDate: "All date",
        buyerStarGift: "Star of gift",
        buyer5Star: "5 star",
        buyer4Star: "4 star",
        buyer3Star: "3 star",
        buyer2Star: "2 star",
        buyer1Star: "1 star",
        buyerallStar: "all gifts",
        buyerGiftCategory: "Gift Category",
        buyerStore: "store",
        buyerLogout: "Logout",

        //buyerorder
        buyerOrderId: "Order Id",
        buyerOrderActive: "Active",
        buyerOrderInActive: "Inactive",
        buyerOrderItem: "Item",
        buyerOrderPaymentstat: "Payment status",
        buyerOrderDate: "Date",
        buyerOrderDeliveryStat: "Delivery Stat",
        buyerOrderDelivered: "Delivered",
        buyerOrderPending: "Pending",
        buyerOrderDelete: "Delete",
        buyerOrderApprove: "Approve",
        buyerOrderVerifyPayment: "Verify Payment",

        //giftpage
        buyerGiftPageorder: "Order",
        buyerGiftPageChat: "Chat",
        buyerRateProduct: "Rate this product",
        buyerLoginSignup: "Login or signup to order",
        buyerGoodGiftSuggestion: "Good gift suggestion",
        buyerAlreadyReview: "Gift Already reviewed",

        //checkout
        buyerPayAmount: "Pay Amount",
        buyerInformation: "Information",
        buyercheckout: "Checkout",

        //payment success
        complete: "Complete",
        tryAgain: "Try again",
        buyerPaymentSuccessHeader: "Payment successful",
        buyerPaymentSuccessBody:
          "Gift ordered, please click on the complete button to go to the shoe page",
        buyerPaymentLoading: "Please wait for payment verification",
        buyerPaymentFailHeader: "Payment Failed!",
        buyerPaymentFailBody: "oh no! something went wrong, please try again.",
        buyerWithdrawFailHeader: "Withdraw Failed!",
        buyerWithdrawFailBody: "oh no! something went wrong, please try again.",
        buyerWithdrawVerification: "Please wait for withdraw verification",
        buyerWithdrawSuccessHeader: "Withdraw successful!",
        buyerWithdrawSuccessBody:
          "withdraw complete, please click on the complete button to go to the main page.",
      },
    },
    amh: {
      translation: {
        logo: "amh",
        next: "ቀጥሎ",
        search: "ፈልግ",
        back: "ተመለስ",
        previous: "ቀዳሚ",
        email: "ኢሜይል",
        password: "የይለፍ ቃል",
        confirmPassword: "የይለፍ ቃል አረጋግጥ",
        or: "ወይም",
        step: "ደረጃ",
        firstName: "ስም",
        lastName: "የአባት ስም",
        country: "ሀገር",
        city: "ከተማ",
        street: "ጎዳና",
        account: "መለያ",
        comment: "አስተያየት",
        earn: "ተገኘ",
        edit: "ለወጥ",
        save: "አስቀምጥ",
        cancel: "መሰረዝ",
        upload: "ምስል ይቀይሩ",
        messages: "መልዕክቶች",
        clickHere: "ጠቅ ያድርጉ",
        post: "ይለጥፉ",

        //HomePage
        homeWelcome:
          "ለእርስዎ እና ለሚወዷቸው ሰዎች ስጦታዎችን ለመግዛት እና ለመሸጥ ወደሚመች ቦታ እንኳን በደህና መጡ። ማንኛውንም አጋጣሚ ልዩ የሚያደርጉትን ሰፊ የልዩ ዕቃዎች ምርጫን ያግኙ።",
        homeIntro: "ስጦታዎች ይግዙ እና ይሽጡ",
        homeTxtGift: "ስጦታዎች",
        homeTxtTestimonials: "ምስክርነቶች",
        homeTxtSignup: "ተመዝገቢ",
        homeTxtSignin: "ግባ",
        homeTxtBlog: "ብሎጎች",
        homeTxtAbout: "ስለ",
        homeTxtShop: "ሱቅ",

        //AboutPage
        aboutHeader: "የሜሪታ ስጦታዎች",
        aboutBody1: "ወደ የሜሪታ ስጦታዎች እንኳን በደህና መጡ፣ ፈጠራ ያለው የገበያ። ",
        aboutBody2:
          "በ የሜሪታ ስጦታዎች ላይ ግዢ ሲፈጽሙ እርስዎ ገዢው የእቃውን አቅርቦት እስኪያጸድቁ ድረስ የሻጩ ክፍያ በድብቅ ይቆያል። ይህ ማለት በግብይቱ ላይ ሙሉ ቁጥጥር አለህ እና ሻጩ ክፍያውን ከማግኘቱ በፊት በግዢህ ደስተኛ መሆንህን ማረጋገጥ ትችላለህ።",
        aboutBody3:
          " ይህ የፈጠራ አካሄድ ለገዢዎች ተጨማሪ የጥበቃ ሽፋን ይሰጣል፣ ይህም የአእምሮ ሰላም እና ከእኛ ጋር ለመግዛት በራስ መተማመን ይሰጥዎታል። ትክክለኛውን ስጦታ መቀበል ምን ያህል አስፈላጊ እንደሆነ እንረዳለን እና ግብይቱን ከማጠናቀቅዎ በፊት ሙሉ በሙሉ እርካታ እንዳገኙ ማረጋገጥ እንፈልጋለን።",
        aboutBody4:
          "ለሻጮች ይህ ባህሪ ገዢው በግዢው ደስተኛ ሲሆን ክፍያ እንደሚቀበሉ ዋስትና ይሰጣል. ሻጮች ከፍተኛ ጥራት ያላቸውን ምርቶች እና እጅግ በጣም ጥሩ የደንበኞች አገልግሎት እንዲያቀርቡ ያበረታታል፣ ይህም ለሚመለከተው ሁሉ አወንታዊ ተሞክሮን ያረጋግጣል።",
        aboutBody5:
          "በ የሜሪታ ስጦታዎች ስጦታዎችን መግዛት እና መሸጥ ያልተቋረጠ እና አስደሳች ሂደት የሆነበት ግልጽ እና ደህንነቱ የተጠበቀ የገበያ ቦታ ለመፍጠር እንጥራለን። ማህበረሰባችንን ዛሬ ይቀላቀሉ እና ከልዩ ማፅደቅ ላይ ከተመሠረተ የአቅርቦት ስርዓታችን ጋር የሚመጣውን ምቾት እና የአእምሮ ሰላም ያግኙ።",
        aboutTxtContact: "መረጃ",
        aboutTxtPhone: "ስልክ ቁጥር",

        //login
        LoginTxt: "ግባ",
        PasswordShowTxt: "የይለፍ ቃል አሳይ",
        forgetPasswordTxt: "የይለፍ ቃል መርሳት",
        heyTxt: "ሄይ፣ ወደ ሜሪታ ይግቡ",
        bodyLoginTxt:
          " ለምትወዱት ሰው ስጦታ የሚገዙበት እና የሚሸጡበት ቦታ።እባክዎ መረጃን ወደ እርስዎ በማስገባት መለያ ይፍጠሩ እና ከእኛ ጋር ጉዞ ይጀምሩ።",

        //signup
        signupIntroTxt: "እንኳን ወደ ሜሪታ እንኳን በደህና መጡ",
        signupBodyTxt:
          "ለምትወዱት ሰው ስጦታ የሚገዙበት እና የሚሸጡበት ቦታ።እባክዎ መረጃን ወደ እርስዎ በማስገባት መለያ ይፍጠሩ እና ከእኛ ጋር ጉዞ ይጀምሩ።",
        page1Header: "መሰረታዊ መረጃ",
        page2Header: "የአካባቢ መረጃ",

        //type
        buyAGift: "ስጦታ ይግዙ",
        sellAGift: "ስጦታ ይሽጡ",

        //request
        requestTxtPassword: "የይለፍ ቃልህን ቀይር",
        requestTxtBtn: "የሚስጥር ቁልፍ ይቀይሩ",

        //resetpage
        resetPasswordIntro: "አዲስ የይለፍ ቃል",
        resetPasswordBtn: "የይለፍ ቃል አስቀምጥ",

        //blogDisplay
        loginToComment: "አስተያየት ለመስጠት ይግቡ",

        //sellerNav
        navProfileTXt: "መገለጫ",
        navOrderTxt: "ትዕዛዞች",
        navMessageTxt: "መልዕክቶች",
        navGiftsTxt: "ስጦታዎች",
        navWithdrawTxt: "ማውጣት",

        //sellergifts
        sellerPostAGift: "ስጦታ ይለጥፉ",
        sellerGiftPostTxt: "ስጦታ ይለጥፉ",
        SellerGiftsPostSuccess: "ምርት በተሳካ ሁኔታ ተለጠፈ",
        sellerGiftsBgRemover: "ለተሻሻለ ውጤት የጀርባ ማስወገጃ ይጠቀሙ።",
        sellerGiftsBgRemovermobile: "የጀርባ ማስወገጃ",
        giftName: "የስጦታ ስም",
        giftPrice: "የስጦታ ዋጋ",
        giftLocation: "የስጦታ ቦታ",
        giftDescription: "መግለጫ",
        giftCategory1: "ለግል",
        giftCategory2: "የቤት ዲኮር",
        giftCategory3: "የቴክኖሎጂ መግብሮች",
        giftCategory5: "ፋሽን",
        giftCategory6: "ሌሎች",

        //sellerwithdraw
        withdrawGetPaid: "ክፍያ ያግኙ",
        withdrawAvailableBalance: "ቀሪ ሂሳብ",
        withdrawaccountName: "የባንክ ስም",
        withdrawaccountNumber: "የባንክ ቁጥር",
        withdrawBank: "የባንክ",
        withdrawwithDrawRequest: "የመውጣት ጥያቄ",
        withdrawTransaction: "የባንክ መግለጫ",

        //buyerpage
        buyerPriceGift: "የስጦታ ዋጋ",
        buyerGreaterThan1000: "ከ1000ብር በላይ",
        buyerLessThan1000: "ከ1000ብር በታች",
        buyerLessThan500: "ከ500ብር በታች",
        buyer1to100: "ከ1ብር እስከ 100ብር",
        buyerAllPrice: "ሁሉም ዋጋ",
        buyerDateOfGift: "የስጦታ ቀን",
        buyerLessThan24: "ከ 24 ሰዓታት በታች",
        buyerLessThanAWeek: "ከአንድ ሳምንት ያነሰ ጊዜ",
        buyerLessThanAMonth: "ከአንድ ወር በታች",
        buyerLessThanAYear: "ከአንድ አመት በታች",
        buyerGreaterThanAYear: "ከአንድ አመት በላይ",
        buyerAllDate: "ሁሉም ቀን",
        buyerStarGift: "የስጦታ ኮከብ",
        buyer5Star: "5 ኮከብ",
        buyer4Star: "4 ኮከብ",
        buyer3Star: "3 ኮከብ",
        buyer2Star: "2 ኮከብ",
        buyer1Star: "1 ኮከብ",
        buyerallStar: "ሁሉም ስጦታዎች",
        buyerGiftCategory: "የስጦታ ምድብ",
        buyerStore: "መደብር",
        buyerLogout: "ውጣ",

        //buyerorder
        buyerOrderId: "የትዕዛዝ መታወቂያ",
        buyerOrderActive: "ንቁ",
        buyerOrderInActive: "እንቅስቃሴ-አልባ",
        buyerOrderItem: "ንጥል",
        buyerOrderPaymentstat: "የክፍያ ሁኔታ",
        buyerOrderDate: "ቀን",
        buyerOrderDeliveryStat: "የመላኪያ ስታቲስቲክስ",
        buyerOrderDelivered: "ደረሰ",
        buyerOrderPending: "በመጠባበቅ ላይ",
        buyerOrderDelete: "ሰርዝ",
        buyerOrderApprove: "አጽድቅ",
        buyerOrderVerifyPayment: "ክፍያን ያረጋግጡ",

        //giftpage
        buyerGiftPageorder: "ማዘዝ",
        buyerGiftPageChat: "መልእክት",
        buyerRateProduct: "ለዚህ ምርት ደረጃ ይስጡት።",
        buyerLoginSignup: "ለማዘዝ ይግቡ ወይም ይመዝገቡ።",
        buyerGoodGiftSuggestion: "ጥሩ የስጦታ ጥቆማ",
        buyerAlreadyReview: "ስጦታ አስቀድሞ ተገምግሟል",

        //checkout
        buyerPayAmount: "የክፍያ መጠን",
        buyerInformation: "መረጃ",
        buyercheckout: "ጨርሰህ ውጣ",

        //payment success
        complete: "ተጠናቀቀ",
        tryAgain: "እንደገና ሞክር",
        buyerPaymentSuccessHeader: "ክፍያ ተሳክቷል።",
        buyerPaymentSuccessBody: "ስጦታ ታዝዟል፣ ወደ ሱቅ ገጽ ለመሄድ ተጠናቀቀ ሙሉውን ቁልፍ ይጫኑ",
        buyerPaymentLoading: "እባክዎ የክፍያ ማረጋገጫ ይጠብቁ",
        buyerPaymentFailHeader: "ክፍያ አልተሳካም!",
        buyerPaymentFailBody: "የሆነ ችግር ተፈጥሯል፣ እባክዎ እንደገና ይሞክሩ።",
        buyerWithdrawFailHeader: "ክፍያ አልተሳካም!",
        buyerWithdrawFailBody: "የሆነ ችግር ተፈጥሯል፣ እባክዎ እንደገና ይሞክሩ።",
        buyerWithdrawVerification: "እባክዎ የክፍያ ማረጋገጫ ይጠብቁ",
        buyerWithdrawSuccessHeader: "በተሳካ ሁኔታ ወጣ",
        buyerWithdrawSuccessBody:
          "በተሳካ ሁኔታ ወጣ፣ ወደ ሱቅ ገጽ ለመሄድ ተጠናቀቀ ሙሉውን ቁልፍ ይጫኑ",
      },
    },
  },
});

export default i18n;
