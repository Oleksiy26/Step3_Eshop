import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Checkbox from '../Checkbox';
<<<<<<< HEAD
import './Colors.scss';
=======
>>>>>>> 06254eb1844c2ce058fca09af159c1f188a9a575

const Colors = () => {
  const products = useSelector((state) => state.products);
  const [colorsArray, setColorsArray] = useState([]);

  useEffect(() => {
    const colorsArray = products.products.map((item) => item.color);
    const uniqueColors = new Set(colorsArray)
    setColorsArray(Array.from(uniqueColors))
  }, [products])

  return (
    <ul className="page-colors_list">
      {colorsArray &&
        colorsArray.map((item, index) => {
          return (
            <li className="page-colors_item" key={index}>
              <Checkbox
                label={item}
                id="flexCheckDefault"
                colorSquare
                classForSquare={item.toLowerCase()}
              />
            </li>
          );
        })}
      <p className="more-colors pseudo colors">More colors</p>
    </ul>
  );
};
export default Colors;
