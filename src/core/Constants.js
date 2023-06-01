const Constants = {

  // SUCCESS_PAYMENT_URL : 'http://localhost:3000/CustomerPortal/payment/success',
  // FAILURE_PAYMENT_URL : 'http://localhost:3000/CustomerPortal/payment/failure',

  // SUCCESS_PAYMENT_URL : 'http://213.42.234.23:8904/CustomerPortal/payment/success',
  // FAILURE_PAYMENT_URL : 'http://213.42.234.23:8904/CustomerPortal/payment/failure',

  serverlink: 'http://213.42.234.23:8904/CustomerAPI',
  //'http://10.244.220.218:8494/AjmanSewerageCheckoutUpgradeNOCPortal',
  //'http://213.42.234.19:8494/NOCApplicationQA', 
  //'http://10.244.220.218:8494/AjmanSewerageProdFixesNOCAPI',
  timeout: 40000,

  //Qa http
  //uaePassLoginLink: 'https://qa-id.uaepass.ae/trustedx-authserver/oauth/main-as?redirect_uri=http://213.42.234.23:8903/Home/Redirect&client_id=ajmansewerage_web_stage&response_type=code&state=_login_redirection_&scope=urn:uae:digitalid:profile:general&acr_values=urn:safelayer:tws:policies:authentication:level:low',
  //uaePassLogoutLink: 'https://qa-id.uaepass.ae/trustedx-authserver/digitalid-idp/logout?redirect_uri=http://213.42.234.23:8903/Home/Redirect',
  
  //Qa https
  //uaePassLoginLink: 'https://qa-id.uaepass.ae/trustedx-authserver/oauth/main-as?redirect_uri=https://213.42.234.23:8903/Home/Redirect&client_id=ajmansewerage_web_stage&response_type=code&state=_login_redirection_&scope=urn:uae:digitalid:profile:general&acr_values=urn:safelayer:tws:policies:authentication:level:low',
  //uaePassLogoutLink: 'https://qa-id.uaepass.ae/trustedx-authserver/digitalid-idp/logout?redirect_uri=https://213.42.234.23:8903/Home/Redirect'
  
    
  //Stg
  //uaePassLoginLink:'https://stg-ids.uaepass.ae/authenticationendpoint/login.do?acr_values=urn:safelayer:tws:policies:authentication:level:low&client_id=sandbox_stage&commonAuthCallerPath=/oauth2/authorize&forceAuth=false&passiveAuth=false&redirect_uri=http://213.42.234.23:8903/Home/redirect&response_type=code&scope=urn:uae:digitalid:profile:general&state=_login_redirection_&tenantDomain=carbon.super&ui_locales=en&sessionDataKey=ff9b5d34-5008-4bca-9ba5-127bb6191d40&relyingParty=sandbox_stage&type=oauth2&sp=UAE+PASS+Staging+Sandbox&isSaaSApp=false&authenticators=BasicAuthenticator:LOCAL',
  // uaePassLoginLink :'https://stg-id.uaepass.ae/idshub/authorize?redirect_uri=http://213.42.234.23:8904/Home/redirect&client_id=sandbox_stage&response_type=code&state=_login_redirection_&scope=urn:uae:digitalid:profile:general&acr_values=urn:safelayer:tws:policies:authentication:level:low&ui_locales=en',
  // uaePassLogoutLink:'https://stg-id.uaepass.ae/trustedx-authserver/digitalid-idp/logout?redirect_uri==http://213.42.234.23:8904/Home/redirect',
  // uaePassLoginLink :'https://stg-id.uaepass.ae/idshub/authorize?redirect_uri=http://213.42.234.23:8904/CustomerPortal/Home/redirect&client_id=sandbox_stage&response_type=code&state=_login_redirection_&scope=urn:uae:digitalid:profile:general&acr_values=urn:safelayer:tws:policies:authentication:level:low&ui_locales=en',
  
  // rough
  
  // uaePassLoginLink :'https://stg-id.uaepass.ae/authenticationendpoint/login.do?acr_values=urn%3Asafelayer%3Atws%3Apolicies%3Aauthentication%3Alevel%3Alow&client_id=sandbox_stage&commonAuthCallerPath=%2Foauth2%2Fauthorize&forceAuth=false&passiveAuth=false&redirect_uri=http%3A%2F%2F213.42.234.23%3A8904%2FCustomerPortal%2FHome%2Fredirect&response_type=code&scope=urn%3Auae%3Adigitalid%3Aprofile%3Ageneral&state=_login_redirection_&tenantDomain=carbon.super&ui_locales=en%E2%80%99&sessionDataKey=53ab2ac6-5848-4ca5-9670-ee8798e92ad6&relyingParty=sandbox_stage&type=oauth2&sp=UAE+PASS+Staging+Sandbox&isSaaSApp=false&reCaptcha=TRUE&authenticators=BasicAuthenticator%3ALOCAL',
  // uaePassLoginLink :'https://stg-id.uaepass.ae/idshub/authorize?redirect_uri=http://localhost:3000/CustomerPortal/Home/redirect&client_id=sandbox_stage&response_type=code&state=_login_redirection_&scope=urn:uae:digitalid:profile:general&acr_values=urn:safelayer:tws:policies:authentication:level:low&ui_locales=en',
  
  // rough
  
  // uaePassLogoutLink:'https://stg-id.uaepass.ae/trustedx-authserver/digitalid-idp/logout?redirect_uri==http://213.42.234.23:8904/CustomerPortal/Home/redirect',

  //uaePassLoginLink :'https://stg-id.uaepass.ae/idshub/authorize?redirect_uri=http://213.42.234.19:8494/AjmanSewerageNOCChangesCustomerPortal/Home/redirect&client_id=sandbox_stage&response_type=code&state=_login_redirection__&scope=urn:uae:digitalid:profile:general&acr_values=urn:safelayer:tws:policies:authentication:level:low&ui_locales=en',
  //uaePassLogoutLink:'https://stg-ids.uaepass.ae/trustedx-authserver/digitalid-idp/logout?redirect_uri=http://213.42.234.19:8494',


  //Prod
  //uaePassLoginLink:'https://ids.uaepass.ae/authenticationendpoint/login.do?acr_values=urn:safelayer:tws:policies:authentication:level:low&client_id=ajm_sewerage_web_prod&commonAuthCallerPath=/oauth2/authorize&forceAuth=false&passiveAuth=false&redirect_uri=https://css.ajmansewerage.ae/Account/UAEPassRedirect&response_type=code&scope=urn:uae:digitalid:profile:general&state=iZ65sNfMLUewkfLQ07UtAA/EN&tenantDomain=carbon.super&ui_locales=en&sessionDataKey=59ae91c7-894b-4a8e-b675-e06fc6b1f447&relyingParty=ajm_sewerage_web_prod&type=oauth2&sp=Ajman+sewerage+website&isSaaSApp=false&reCaptcha=TRUE&authenticators=BasicAuthenticator:LOCAL',
  //uaePassLogoutLink:'https://id.uaepass.ae/trustedx-authserver/digitalid-idp/logout?redirect_uri=http://213.42.234.19:8494/AjmanSewerageNOCApplication/login'
  

// zaher

uaePassLoginLink :'https://stg-id.uaepass.ae/idshub/authorize?redirect_uri=http://213.42.234.23:8904/CustomerPortal/Home/redirect&client_id=sandbox_stage&response_type=code&state=_login_redirection_&scope=urn:uae:digitalid:profile:general&acr_values=urn:safelayer:tws:policies:authentication:level:low&ui_locales=en',
// uaePassLogoutLink:'https://stg-id.uaepass.ae/trustedx-authserver/digitalid-idp/logout?redirect_uri==http://213.42.234.23:8904/CustomerPortal/',

// after zaher change uaePassLogoutLink
uaePassLogoutLink:'https://stg-id.uaepass.ae/trustedx-authserver/digitalid-idp/logout?redirect_uri=http://213.42.234.23:8904/CustomerPortal/',

// zaher


// zaher local

// uaePassLoginLink :'https://stg-id.uaepass.ae/idshub/authorize?redirect_uri=http://localhost:3000/CustomerPortal/Home/redirect&client_id=sandbox_stage&response_type=code&state=_login_redirection_&scope=urn:uae:digitalid:profile:general&acr_values=urn:safelayer:tws:policies:authentication:level:low&ui_locales=en',
// uaePassLogoutLink:'https://stg-id.uaepass.ae/trustedx-authserver/digitalid-idp/logout?redirect_uri==http://localhost:3000/CustomerPortal/',

// zaher local



  CONNECTION_NOC_VALIDATE : 'api/noc/validateproperty',
  INFO_NEEDED : 'api/noc/additionalinformation',


// zaher

SUCCESS_PAYMENT_URL : 'http://213.42.234.23:8904/CustomerPortal/payment/success',
FAILURE_PAYMENT_URL : 'http://213.42.234.23:8904/CustomerPortal/payment/failure',

// SUCCESS_PAYMENT_URL : 'http://localhost:3000/CustomerPortal/payment/success',
// FAILURE_PAYMENT_URL : 'http://localhost:3000/CustomerPortal/payment/failure',

// zaher

  // SUCCESS_PAYMENT_URL : 'http://213.42.234.23:8903/payment/success',
  // FAILURE_PAYMENT_URL : 'http://213.42.234.23:8903/payment/failure',
  
  EXCAVATION_NOC_AFTER_THREE_DS : 'api/noc/excavationNocAfterThreeDS',
  CONNECTION_NOC_AFTER_THREE_DS : 'api/payment/ConnectionNocUpdatePaymentDetails',

};

export default Constants;
