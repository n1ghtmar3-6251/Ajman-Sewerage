

const ReadSpeakerReader = ({ language, url }) => {
  const getLangCode = () => {
    // Map the language prop to ReadSpeaker language codes
    switch (language) {
      case 'en':
        return 'en_uk';
      case 'hi':
        return 'hi_in';
      case 'ar':
        return 'ar_ar';
      default:
        return 'en_uk'; // Default to English if language is not provided or unrecognized
    }
  };


  const encodedURL = encodeURIComponent(window.location.href);
  const langCode = getLangCode();

  return (
    <div id="readspeaker_button1" className="rs_skip rsbtn rs_preserve school">
      <a
        rel="nofollow"
        className="rsbtn_play"
        title="ReadSpeaker webReader إستمع إلى هذه الصفحةِ مستخدماً"
        href={`https://app-as.readspeaker.com/cgi-bin/rsent?customerid=12333&lang=${langCode}&url=${encodedURL}`}
      >
        <span className="rsbtn_left rsimg rspart">
          <span className="rsbtn_text">
            <span>Listen</span>
          </span>
        </span>
        <span className="rsbtn_right rsimg rsplay rspart"></span>
      </a>
    </div>
  );
};

export default ReadSpeakerReader;