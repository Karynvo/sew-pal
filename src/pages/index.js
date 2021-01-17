import * as React from "react"

// markup
const IndexPage = () => {
  return (
    <main>
      <title>Home Page</title>
      <div className="jumbotron">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 flex items-center justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl mx-auto jumbotron-header">
            Popular Indie Tech Drawings
          </h2>
        </div>
      </div>
      <div className="container mx-auto px-12 py-6">
        <iframe className="airtable-embed" src="https://airtable.com/embed/shrgzCG69rKr5mST4?backgroundColor=redLight&viewControls=on" frameBorder="0"></iframe>
      </div>
    </main>
  )
}

export default IndexPage
