import { useState } from 'react';
import { isTemplateExpression } from 'typescript';
import styles from './App.module.css';
import poweredImage from './assets/powered.png';

import {levels, calculateIMC, Level} from './helpers/imc';
import { GridItem } from './components/GridItem'
import leftArrowImage from './assets/leftarrow.png'

const App = () => {
  const [heightField, setheightField] = useState<number> (0);
  const [weightField, setWeightField] = useState<number> (0);
  const [toShow, setToShow] = useState<Level | null>(null);
  const handleBackButton = () => {
    setToShow(null);
    setheightField(0);
    setWeightField(0);
  }


  const handleCalculateButton = () => {
    if(heightField && weightField )
    {
      setToShow(calculateIMC(heightField, weightField));
    }
    else alert('Digite todos os campos.');
  }

  return(
    <div className={styles.main}> 
      <header>
        <div className={styles.headerContainer}>
          <img src={poweredImage} alt='' width={80} />
        </div>
      </header>
      <div className={styles.container}>
        <div className={styles.leftSide}> 
        <h1>Calcule o seu IMC</h1>
        <p>IMC é a sigla para Índice de Massa Corpórea, parâmetro adotado pela Organização Mundial de Saúde para calcular o peso ideal de cada pessoa. </p>
        
        <input 
          type="number"
          placeholder="Digite a sua altura. Exemplo: 1.5 (em metros)"
          value={heightField > 0? heightField : ''}
          onChange={e => setheightField(parseFloat(e.target.value))}
          disabled={toShow ? true : false}
          />

        <input 
          type="number"
          placeholder="Digite o seu peso. Exemplo: 45.3 (em kilos)"
          value={weightField > 0? weightField : ''}
          onChange={e => setWeightField(parseFloat(e.target.value))}
          disabled={toShow ? true : false}
          />

          <button onClick={handleCalculateButton} disabled={toShow ? true : false}>
            Calcular
          </button>

        </div>
        <div className={styles.rightSide}> 
        
        {!toShow && 
        <div className={styles.grid}>
          {levels.map((item, key) => (
            <GridItem key={key} item={item} />
          ))}
        </div>
        }

        {toShow &&
          <div className={styles.rightBig}>
            <div className={styles.rightArrow} onClick={handleBackButton}>
              <img src={leftArrowImage} alt="" width={25}/>
            </div>
            <GridItem item={toShow}/>
          </div>
        }

        </div>
      </div>
    </div>
  );
}

export default App;