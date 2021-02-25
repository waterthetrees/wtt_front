import React from 'react';
import './Privacy.scss';

function Privacy(props) {
  console.log('privacy', props);
  return (
    <div className="privacy">

      <div className="privacy__header">
        <h2>Water the Trees</h2>
        <h2>Privacy Policy</h2>
      </div>

      <div className="privacy__main">
        <div className="privacy__p">
          This page is used to inform Water the Trees visitors
          regarding our policies with the collection, use,
          and disclosure of Personal Information if anyone decided to use our Service,
          the Website waterthetrees.com.
        </div>

        <div className="privacy__p">
          If you choose to use our Service,
          then you agree to the collection and use of information in relation with this policy.
          The Personal Information that we collect are used for providing and improving the Service.
          We will not use or share your information
          with anyone except as described in this Privacy Policy.
        </div>

        <div className="privacy__p">
          The terms used in this Privacy Policy have
          the same meanings as in our Terms and Conditions,
          which is accessible at Website URL, unless otherwise defined in this Privacy Policy.
        </div>

        <div className="privacy__p">
          <h3>Information Collection and Use</h3>

          For a better experience while using our Service,
          we may require you to provide us with certain personally identifiable information,
          including but not limited to your name, email,
          and location. The information that we collect will be used to contact or identify you.
        </div>

        <div className="privacy__p">
          <h3>Log Data</h3>

          We want to inform you that whenever you visit our website,
          we collect information that your browser sends to us that is called Log Data.
          This Log Data may include information such as your
          computer&apos;s Internet Protocol (“IP”) address, browser version,
          pages of our Service that you visit, the time
          and date of your visit, the time spent on those pages, and other statistics.

        </div>

        <div className="privacy__p">
          <h3>Cookies</h3>

          Cookies are files with small amount of data
          that is commonly used an anonymous unique identifier.
          These are sent to your browser from the website
          that you visit and are stored on your computer&apos;s hard drive.
        </div>

        <div className="privacy__p">
          Our website uses these “cookies” to collection information and to improve our Service.
          You have the option to either accept or refuse these cookies,
          and know when a cookie is being sent to your computer.
          If you choose to refuse our cookies,
          you may not be able to use some portions of our Service.
        </div>

        <div className="privacy__p">
          <h3>Service Providers</h3>

          We may employ third-party companies and individuals due to the following reasons:

          To facilitate our Tree Planting;
          To provide Tree Planting on our behalf;
          To performTree Planting-related services; or
          To assist us in analyzing how Water the Trees is used.
        </div>

        <div className="privacy__p">
          We want to inform Water the Trees users that
          these third parties have access to your Personal Information.
          The reason is to perform the tasks assigned to them on our behalf.
          However, they are obligated not to disclose or use the information for any other purpose.
        </div>

        <div className="privacy__p">
          <h3>Security</h3>

          We value your trust in providing us your Personal Information,
          thus we are striving to use commercially acceptable means of protecting it.
          But remember that no method of transmission over the internet,
          or method of electronic storage is 100% secure and reliable,
          and we cannot guarantee its absolute security.
        </div>

        <div className="privacy__p">
          <h3>Links to Other Sites</h3>

          Our Service may contain links to other sites.
          If you click on a third-party link, you will be directed to that site.
          Note that these external sites are not operated by us.
          Therefore, we strongly advise you to review the Privacy Policy of these websites.
          We have no control over, and assume no responsibility for the content,
          privacy policies, or practices of any third-party sites or services.
        </div>

        <div className="privacy__p">
          <h3>Children&apos;s Privacy</h3>

          Our Services do not address anyone under the age of 13.
          We do not knowingly collect personal identifiable information from children under 13.
          In the case we discover that a child under 13 has provided us with personal information,
          we immediately delete this from our servers.
          If you are a parent or guardian and
          you are aware that your child has provided us with personal information,
          please contact us so that we will be able to do necessary actions.
        </div>

        <div className="privacy__p">
          <h3>Changes to This Privacy Policy</h3>

          We may update our Privacy Policy from time to time.
          Thus, we advise you to review this page periodically for any changes.
          We will notify you of any changes by posting the new Privacy Policy on this page.
          These changes are effective immediately, after they are posted on this page.
        </div>

        <div className="privacy__p">
          If you have any questions or suggestions about our Privacy Policy,
          do not hesitate to contact us.
        </div>
      </div>
    </div>
  );
}

export default Privacy;
