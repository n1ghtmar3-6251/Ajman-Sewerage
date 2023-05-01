const Constants = {

  SUCCESS_PAYMENT_URL : 'http://213.42.234.23:8904/CustomerPortal/payment/success',
  FAILURE_PAYMENT_URL : 'http://213.42.234.23:8904/CustomerPortal/payment/failure',

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
  
  uaePassLoginLink :'https://stg-id.uaepass.ae/idshub/authorize?redirect_uri=http://213.42.234.23:8904/CustomerPortal/Home/redirect&client_id=sandbox_stage&response_type=code&state=_login_redirection_&scope=urn:uae:digitalid:profile:general&acr_values=urn:safelayer:tws:policies:authentication:level:low&ui_locales=en',
  // uaePassLoginLink :'https://stg-id.uaepass.ae/idshub/authorize?redirect_uri=http://localhost:3000/CustomerPortal/Home/redirect&client_id=sandbox_stage&response_type=code&state=_login_redirection_&scope=urn:uae:digitalid:profile:general&acr_values=urn:safelayer:tws:policies:authentication:level:low&ui_locales=en',
  
  // rough
  
  uaePassLogoutLink:'https://stg-id.uaepass.ae/trustedx-authserver/digitalid-idp/logout?redirect_uri==http://213.42.234.23:8904/CustomerPortal/Home/redirect',

  //uaePassLoginLink :'https://stg-id.uaepass.ae/idshub/authorize?redirect_uri=http://213.42.234.19:8494/AjmanSewerageNOCChangesCustomerPortal/Home/redirect&client_id=sandbox_stage&response_type=code&state=_login_redirection__&scope=urn:uae:digitalid:profile:general&acr_values=urn:safelayer:tws:policies:authentication:level:low&ui_locales=en',
  //uaePassLogoutLink:'https://stg-ids.uaepass.ae/trustedx-authserver/digitalid-idp/logout?redirect_uri=http://213.42.234.19:8494',


  //Prod
  //uaePassLoginLink:'https://ids.uaepass.ae/authenticationendpoint/login.do?acr_values=urn:safelayer:tws:policies:authentication:level:low&client_id=ajm_sewerage_web_prod&commonAuthCallerPath=/oauth2/authorize&forceAuth=false&passiveAuth=false&redirect_uri=https://css.ajmansewerage.ae/Account/UAEPassRedirect&response_type=code&scope=urn:uae:digitalid:profile:general&state=iZ65sNfMLUewkfLQ07UtAA/EN&tenantDomain=carbon.super&ui_locales=en&sessionDataKey=59ae91c7-894b-4a8e-b675-e06fc6b1f447&relyingParty=ajm_sewerage_web_prod&type=oauth2&sp=Ajman+sewerage+website&isSaaSApp=false&reCaptcha=TRUE&authenticators=BasicAuthenticator:LOCAL',
  //uaePassLogoutLink:'https://id.uaepass.ae/trustedx-authserver/digitalid-idp/logout?redirect_uri=http://213.42.234.19:8494/AjmanSewerageNOCApplication/login'
  
  CONNECTION_NOC_VALIDATE : 'api/noc/validateproperty',
  INFO_NEEDED : 'api/noc/additionalinformation',

  // SUCCESS_PAYMENT_URL : 'http://213.42.234.23:8903/payment/success',
  // FAILURE_PAYMENT_URL : 'http://213.42.234.23:8903/payment/failure',
  EXCAVATION_NOC_AFTER_THREE_DS : 'api/noc/excavationNocAfterThreeDS',

};

export default Constants;
