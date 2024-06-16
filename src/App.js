import { useEffect, useState } from 'react';
import './App.css';
import LoaderPage from './LoaderPage';
import NutritionComponent from './NutritionComponent';
import image from './imgFood2.jpg';

function App() {

  const [mySearch, setMySearch] = useState('');
  const [stateLoader, setStateLoader] = useState(false);
  const [myNutrition, setMyNutrition] = useState();
  const [wordSubmitted, setWordSubmitted] = useState('');

  const MyId = 'cbd2206e';
  const MyKey = ' ba9ce1c1e7b0c87c875c22c3ca77b53a';
  const API_URL = 'https://api.edamam.com/api/nutrition-details';

  const fetchData = async (ingr) => {
    setStateLoader(true);

    const response = await fetch(`${API_URL}?app_id=${MyId}&app_key=${MyKey}`, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json;charset=UTF-8',
      },
      body: JSON.stringify({ ingr: ingr })
    })

    if(response.ok) {
      setStateLoader(false);
      const data = await response.json();
      setMyNutrition(data);
    } 
    
    else {
      setStateLoader(false);
      alert('ingredients entered incorrectly');
    }
  }
    const myIngredientSearch = (e) => {
      setMySearch(e.target.value);
    }

    const finalSearch = (e) => {
      e.preventDefault();
      setWordSubmitted(mySearch);
    }

  useEffect(() => {
    if (wordSubmitted !== '') {
      let ingr = wordSubmitted.split(/[,,;,\n,\r]/);
      fetchData(ingr);
    }
  }, [wordSubmitted])

  return (
    <div>
      <img src={image} alt="food" />

      <div className='mainContainer'>

    <div className="container">
      <h1>Nutrition Analysis</h1>
      <h3>A full analysis of products will help you monitor your diet, manage your food daily and improve your health.</h3>
      <h4>Write the products to be analyzed in the format "1 avocado, 2 cucumbers, 200ml milk" and click the button.</h4>
      <form onSubmit={finalSearch}>
        <input placeholder='Search...' onChange={myIngredientSearch} value={mySearch} />
        <button type='submit'>Click to analyze</button>
      </form>
    </div>

    <div className='container'>
    {stateLoader && <LoaderPage />}
      {myNutrition && <p className='totalCalories'>Total calories from {wordSubmitted}: {myNutrition.calories} kcal</p>}
        {
          myNutrition && Object.values(myNutrition.totalNutrients)
            .map(({ label, quantity, unit }) =>
              <NutritionComponent
                label={label}
                quantity={quantity}
                unit={unit}
              />
            )
        }
    </div>
    </div>
    </div>
  );
}


export default App;
