import { useEffect, useState } from 'react'
import axios from 'axios'
import loadingIcon from './loading.gif'

/**
 * A React component that shows the About Us page.
 * All of its content is loaded as JSON from the back-end's /about route.
 * @returns The contents of this component, in JSX form.
 */
const AboutUs = props => {
  const [error, setError] = useState('')
  const [loaded, setLoaded] = useState(false) // show the loading icon until the data arrives
  const [aboutData, setAboutData] = useState(null) // will hold the JSON sent by the server

  // fetch the data once when the component first renders
  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_SERVER_HOSTNAME}/about`,
        )
        setAboutData(response.data) // save the JSON in state
        setLoaded(true) // make the loading icon go away
      } catch (err) {
        console.error(err)
        setError('Failed to load the About Us page. Is the back-end running?')
      }
    }

    fetchAbout()
  }, [])

  return (
    <>
      <h1>About Us</h1>
      {error && <p className="MessageForm-error">{error}</p>}
      {!loaded && !error && <img src={loadingIcon} alt="loading" />}
      {loaded && (
        <section className="AboutUs-section">
          <img
            className="AboutUs-photo"
            src={aboutData.imageUrl}
            alt={`Photo of ${aboutData.name}`}
          />
          {aboutData.paragraphs.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </section>
      )}
    </>
  )
}

// make this component available to be imported into any other file
export default AboutUs