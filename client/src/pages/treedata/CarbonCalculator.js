/* eslint-disable max-len */
/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import DataTable from './DataTable';
import { format } from 'date-fns';

const carbonCalculatorExplainer = (carbonDetails) => ({
  weightTotalGreen: `1.2 * weightaboveGround = 1.2 * ${carbonDetails.weightaboveGround} = ${carbonDetails.weightTotalGreen} lbs`,
  weightDry: `0.725 * weightTotalGreen = 0.725 * ${carbonDetails.weightTotalGreen} = ${carbonDetails.weightDry} lbs`,
  weightCarbon: ` 0.5 * weightDry = 0.5 * ${carbonDetails.weightDry} = ${carbonDetails.weightCarbon} lbs`,
  weightCarbonDioxide: `3.67 * weightCarbon  = 3.67 * ${carbonDetails.weightCarbon} = ${carbonDetails.weightCarbonDioxide} lbs CO2 sequestered in ${carbonDetails.age} years`,
  weightCarbonDioxidePerYear: `weightCarbonDioxide / age  = ${carbonDetails.weightCarbonDioxide} / ${carbonDetails.age} = ${carbonDetails.weightCarbonDioxidePerYear} lbs CO2 sequestered per years`,
  weightCarbonDioxideInKg: `${carbonDetails.convertWeightCarbonDioxideToKg} kg`,
});

const carbonCalculatorMath = (age, dbh, height, planted, decimalYear) => ({
  planted: format(new Date(planted), 'yyyy-MM-dd'),
  decimalYear,
  DBH: dbh,
  height,
  weightaboveGround: 0.25 * dbh * height,
  weightTotalGreen: 1.2 * 0.25 * dbh * height,
  weightDry: 0.725 * 1.2 * 0.25 * dbh * height,
  weightCarbon: 0.5 * 0.725 * 1.2 * 0.25 * dbh * height,
  weightCarbonDioxideInLbs: 3.67 * 0.5 * 0.725 * 1.2 * 0.25 * dbh * height,
  weightCarbonDioxideInKg: 0.45359237 * 3.67 * 0.5 * 0.725 * 1.2 * 0.25 * dbh * height,
  weightCarbonDioxidePerYearInLbs: (3.67 * 0.5 * 0.725 * 1.2 * 0.25 * dbh * height) / age,
  weightCarbonDioxidePerYearInKg: (0.45359237 * 3.67 * 0.5 * 0.725 * 1.2 * 0.25 * dbh * height) / age,
});

const calculateAge = (planted) => {
  const functionName = 'calculateAge';
  const dateFormatted = new Date(planted);
  const diffMs = Date.now() - dateFormatted.getTime();
  const decimalYear = diffMs / (1000 * 60 * 60 * 24 * 365.242);
  return decimalYear;
};

export const CarbonCalculator = ({ treeData }) => {
  const { height, dbh, datePlanted } = treeData;
  if (!height || !dbh || !datePlanted) {
    return <h4>Please enter tree data. Need tree height, dbh, and age for Carbon Calculator.</h4>;
  }
  const decimalYear = calculateAge(datePlanted);
  const age = (decimalYear < 1) ? 1 : decimalYear;
  const carbonDetails = carbonCalculatorMath(age, dbh, height, datePlanted, decimalYear);
  if (decimalYear < 1) {
    delete carbonDetails.weightCarbonDioxideInLbs;
    delete carbonDetails.weightCarbonDioxideInKg;
  }

  return (
    <div className="flex-grid border-top">
      <div className="treehistory-list text-left">
        <h4 className="text-center">Carbon Calculator</h4>
        <DataTable
          data={carbonDetails}
          keys={Object.keys(carbonDetails)}
        />
      </div>
      
      <div className="treehistory-list text-center">
        <h4 className="text-center">Carbon Calculator References</h4>
        <div>
          
          <p>        
            <a href="https://www.unm.edu/~jbrink/365/Documents/Calcdivating_tree_carbon.pdf">
              Calculating CO2 Carbon
            </a>
          </p>

          <p>        
            <a href="https://trees.org/app/uploads/2021/04/Carbon-Brief-External.pdf">
              Trees.org Carbon Brief
            </a>
          </p>

          <p>        
            <a href="https://www.fs.usda.gov/ccrc/tool/cufr-tree-carbon-calculator-ctcc">
              Tree Carbon Calculator
            </a>
          </p>

          <p>        
            <a href="https://www.frontiersin.org/articles/10.3389/fevo.2016.00053/full">
              Carbon Storage and Sequestration of Urban Street Trees in Beijing, China
            </a>
          </p>
          
        </div>
      </div>
    </div>
  );
};

const CarbonCalculatorOverView = ({ treeData }) => (
    <ol>
      <li>Determine the total (green) weight of the tree.</li>
      <li>Determine the dry weight of the tree.</li>
      <li>Determine the weight of carbon in the tree.</li>
      <li>Determine the weight of carbon dioxide sequestered in the tree</li>
      <li>Determine the weight of CO2 sequestered in the tree per year</li>
    </ol>
  );

// 10 years old tree
// 5 meter tall or 16.4 feet tall (“H”)
// 25 cm trunk or 9.8 inch trunk (“D”)
// Wabove-ground= 0.25 D2 H= 0.25(9.82)(16.4) = 394 lbs
// Wtotal green weight = 1.2* Wabove-ground= 1.2 * 394 = 473 lbs
// Wdry weight = 0.725 * Wtotal green weight= 0.725 * 473 = 343 lbs
// Wcarbon = 0.5 * Wdry weight  = 0.5 * 343 = 171.5 lbs
// Wcarbon-dioxide = 3.67 * Wcarbon  = 3.67 * 171.5 = 629 lbs CO2 sequestered in 10 years; that equals 285 kg. EcoMatcher uses an aeverage of 250 kg CO2 sequestered per tree.
