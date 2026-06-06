export function VerifiedCredentialsSection() {
  return (
    <section
      id="credentials"
      className="py-24 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-5xl mx-auto">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Verified Credentials
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Credentials independently issued and publicly verifiable
          </p>
        </div>

        {/* <div className="space-y-6">
          <div
            data-iframe-width="150"
            data-iframe-height="270"
            data-share-badge-id="484481cb-706a-4a4c-bdfd-5472c4b02eb4"
            data-share-badge-host="https://www.credly.com"
          ></div>
          <script
            type="text/javascript"
            async
            src="//cdn.credly.com/assets/utilities/embed.js"
          ></script>
        </div> */}
        <div className="flex justify-center">
          {/* <Card className="p-6 flex justify-center"> */}
          <iframe
            src="https://www.credly.com/embedded_badge/484481cb-706a-4a4c-bdfd-5472c4b02eb4"
            width="180"
            height="270"
            frameBorder="0"
            scrolling="no"
            title="Credly Badge"
          />
          {/* </Card> */}
        </div>
      </div>
    </section>
  );
}
