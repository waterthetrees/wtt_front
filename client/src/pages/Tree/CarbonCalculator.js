/* eslint-disable max-len */
/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import {
  TableRow,
  TableCell,
  Table,
  TableBody,
  TableContainer,
  styled,
} from '@mui/material';
import Section from '@/components/Section/Section';

const papers = [
  {
    title: 'Calculating CO2 Carbon',
    url: 'https://www.unm.edu/~jbrink/365/Documents/Calcdivating_tree_carbon.pdf',
  },
  {
    title: 'Trees.org Carbon Brief',
    url: 'https://trees.org/app/uploads/2021/04/Carbon-Brief-External.pdf',
  },
  {
    title: 'Forestry Service USDA Tree Carbon Calculator',
    url: 'https://www.fs.usda.gov/ccrc/tool/cufr-tree-carbon-calculator-ctcc',
  },
  {
    title:
      'Carbon Storage and Sequestration of Urban Street Trees in Beijing, China',
    url: 'https://www.frontiersin.org/articles/10.3389/fevo.2016.00053/full',
  },
  {
    title: 'Forestry Service USDA Tree Carbon Calculator Paper',
    url: 'https://www.fs.usda.gov/research/treesearch/52933',
  },
  {
    title: 'iTools Carbon Equations and Methods 2020',
    url: 'https://www.itreetools.org/support/resources-overview/i-tree-methods-and-files/new-carbon-equations-and-methods-2020',
  },
  {
    title: 'The Davey Tree Benefits Engine',
    url: 'https://dtbe-api.daveyinstitute.com/https://dtbe-api.daveyinstitute.com/static/home/documents/API-Usage-Information_The-Davey-Tree-Benefits-Engine.pdf',
  },
  {
    title: 'What Is DBH',
    url: 'https://www.nwf.org/-/media/PDFs/Eco-schools/2013-NASA/03_Module-III/Lesson-13/LESSON-13_What-Is-DBH.ashx?la=en&hash=4FAB7CE60A21D9543FEE54A423A50A3F521B1939',
  },
];

const carbonCalculatorExplainer = (carbonDetails) => ({
  weightTotalGreen: `1.2 * weightAboveGround = 1.2 * ${carbonDetails.weightAboveGround} = ${carbonDetails.weightTotalGreen} lbs`,
  weightDry: `0.725 * weightTotalGreen = 0.725 * ${carbonDetails.weightTotalGreen} = ${carbonDetails.weightDry} lbs`,
  weightCarbon: ` 0.5 * weightDry = 0.5 * ${carbonDetails.weightDry} = ${carbonDetails.weightCarbon} lbs`,
  weightCarbonDioxide: `3.67 * weightCarbon  = 3.67 * ${carbonDetails.weightCarbon} = ${carbonDetails.weightCarbonDioxide} lbs CO2 sequestered in ${carbonDetails.age} years`,
  weightCarbonDioxidePerYear: `weightCarbonDioxide / age  = ${carbonDetails.weightCarbonDioxide} / ${carbonDetails.age} = ${carbonDetails.weightCarbonDioxidePerYear} lbs CO2 sequestered per years`,
  weightCarbonDioxideInKg: `${carbonDetails.convertWeightCarbonDioxideToKg} kg`,
});

const carbonCalculatorMathShortForm = (age, dbh, height) => {
  // TODO figure out how to do this if we have dbh but not height or age
  // we are defaulting to 1 if height and age are unknown which screws up the calculation

  const weightAboveGround = 0.25 * dbh * (height || 1);
  const weightTotalGreen = 1.2 * weightAboveGround;
  const weightDry = 0.725 * weightTotalGreen;
  const weightCarbon = 0.5 * weightDry;
  const weightCarbonDioxideInLbs = 3.67 * weightCarbon;
  const weightCarbonDioxideInKg = 0.45359237 * weightCarbonDioxideInLbs;
  const weightCarbonDioxidePerYearInLbs = weightCarbonDioxideInLbs / age;
  const weightCarbonDioxidePerYearInKg = weightCarbonDioxideInKg / age;
  return {
    'Weight CO2 In Lbs': weightCarbonDioxideInLbs.toFixed(2),
    'Weight CO2 In Kg': weightCarbonDioxideInKg.toFixed(2),
    'Weight CO2 Per Year In Lbs': weightCarbonDioxidePerYearInLbs.toFixed(2),
    'Weight CO2 Per Year In Kg': weightCarbonDioxidePerYearInKg.toFixed(2),
  };
};

/**
 * carbonCalculatorMathLongForm This explains the math in the short form
 * @param {*} planted
 * @param {*} decimalYear
 * @param {*} age
 * @param {*} dbh
 * @param {*} height
 * @returns
 */
// const carbonCalculatorMathLongForm = (age, dbh, height, planted, decimalYear) => {
//   const carbonCalculator = {};
//   const planted = format(new Date(planted), 'yyyy-MM-dd')
//   const weightaboveGround = 0.25 * dbh * height
//   const weightTotalGreen = 1.2 * 0.25 * dbh * height
//   const weightDry = 0.725 * 1.2 * 0.25 * dbh * height
//   const weightCarbon = 0.5 * 0.725 * 1.2 * 0.25 * dbh * height
//   const weightCarbonDioxideInLbs = 3.67 * 0.5 * 0.725 * 1.2 * 0.25 * dbh * height
//   const weightCarbonDioxideInKg = 0.45359237 * 3.67 * 0.5 * 0.725 * 1.2 * 0.25 * dbh * height
//   const weightCarbonDioxidePerYearInLbs = (3.67 * 0.5 * 0.725 * 1.2 * 0.25 * dbh * height) / age
//   const weightCarbonDioxidePerYearInKg = (0.45359237 * 3.67 * 0.5 * 0.725 * 1.2 * 0.25 * dbh * height) / age
// };

const calculateAge = (planted) => {
  // TODO decide what to do for trees with no date planted. We are defaulting to 1 year for those trees.
  if (!planted) return 1;
  const dateFormatted = new Date(planted);
  const diffMs = Date.now() - dateFormatted.getTime();
  const decimalYear = diffMs / (1000 * 60 * 60 * 24 * 365.242);
  // TODO decide what to do for trees younger than a year. We are defaulting to 1 year for those trees.
  return decimalYear < 1 ? 1 : decimalYear;
};

const isRange = (value) => {
  if (!value) return false;
  return String(value)?.includes('-');
};

const getAverageFromRange = (range) => {
  const [min, max] = range.split('-');
  return (Number(min) + Number(max)) / 2;
};

const setMessage = (isRangeDbh, isRangeHeight, age, height) => {
  const dbhMessage = isRangeDbh
    ? 'NOTE: DBH for this tree contains a range so we are using the average in our CO2 calculations.'
    : '';

  const heightMessage = height
    ? isRangeHeight
      ? 'NOTE: Height for this tree contains a range so we are using the average in our CO2 calculations.'
      : ''
    : 'NOTE: Tree height data is missing or not formatted so we are defaulting to 1 foot or meter for the carbon calculations.';

  const ageMessage = age
    ? ''
    : 'NOTE: Tree age is missing, not formatted, or less than 1yr so we are defaulting to 1 yr in our CO2 calculations.';

  return { dbhMessage, heightMessage, ageMessage };
};

export const CarbonCalculator = ({ currentTreeData }) => {
  const { dbh, datePlanted, planted } = currentTreeData;
  if (!dbh) {
    return <h4>This tree needs dbh for our Carbon Calculator.</h4>;
  }
  const height = currentTreeData?.height || 1;

  const isRangeDbh = isRange(dbh);
  const isRangeHeight = isRange(height);
  const dbhAverage = isRangeDbh ? getAverageFromRange(dbh) : dbh;
  const heightAverage = isRangeHeight ? getAverageFromRange(height) : height;

  const age = calculateAge(datePlanted || planted);
  const carbonDetails = carbonCalculatorMathShortForm(
    age,
    dbhAverage,
    heightAverage,
  );

  const { dbhMessage, heightMessage, ageMessage } = setMessage(
    isRangeDbh,
    isRangeHeight,
    age,
    height,
  );

  return (
    <div className="flex-grid border-top">
      <div className="treehistory-list text-left">
        <CarbonCalcSections data={carbonDetails} title={'CO2 Calculations'} />
        {dbhMessage && <p>{dbhMessage}</p>}
        {heightMessage && <p>{heightMessage}</p>}
        {ageMessage && <p>{ageMessage}</p>}
        <CarbonCalcSections
          data={carbonCalculatorExplainer}
          title={'Carbon Stats Explainer'}
        />
        <CarbonCalculatorOverView />
        <CarbonCalculatorReferences />
      </div>
    </div>
  );
};

const CarbonCalculatorOverView = () => (
  <Section title={'Calculating CO2'}>
    <ol style={{ paddingLeft: '15px' }}>
      <li>Determine the total (green) weight of the tree.</li>
      <li>Determine the dry weight of the tree.</li>
      <li>Determine the weight of carbon in the tree.</li>
      <li>Determine the weight of CO2 sequestered in the tree</li>
      <li>Determine the weight of CO2 sequestered in the tree per year</li>
    </ol>
  </Section>
);

const CarbonCalculatorReferences = () => (
  <Section title={'CO2 Calculator References'}>
    {papers.map((paper) => (
      <div key={paper.url}>
        <p>
          <a href={paper.url}>{paper.title}</a>
        </p>
      </div>
    ))}
  </Section>
);

const Container = styled(TableContainer)`
  & .MuiTableCell-root {
    font-size: 1rem;
    padding: 6px 0;
  }
`;

export const CarbonCalcSections = ({ data, title }) => {
  if (Object.keys(data).length === 0) {
    return null;
  }
  return (
    <Section title={title}>
      <Container>
        <Table size="small">
          <TableBody>
            {Object.entries(data).map(([label, value]) => {
              if (!value || !label) return;
              return <TableRows key={label} label={label} value={value} />;
            })}
          </TableBody>
        </Table>
      </Container>
    </Section>
  );
};

const TableRowThin = styled(TableRow)`
  & .MuiTableCell-root {
    padding: 0.2rem;
    width: 100vw;
  }
`;

const TableRows = ({ label, value }) => {
  return (
    <TableRowThin key={label}>
      <TableCell sx={{ pl: 0, fontWeight: 'bold' }} style={{ width: '60%' }}>
        {label}
      </TableCell>
      <TableCell>{value}</TableCell>
    </TableRowThin>
  );
};

// 10 years old tree
// 5 meter tall or 16.4 feet tall (“H”)
// 25 cm trunk or 9.8 inch trunk (“D”)
// Wabove-ground= 0.25 D2 H= 0.25(9.82)(16.4) = 394 lbs
// Wtotal green weight = 1.2* Wabove-ground= 1.2 * 394 = 473 lbs
// Wdry weight = 0.725 * Wtotal green weight= 0.725 * 473 = 343 lbs
// Wcarbon = 0.5 * Wdry weight  = 0.5 * 343 = 171.5 lbs
// Wcarbon-dioxide = 3.67 * Wcarbon  = 3.67 * 171.5 = 629 lbs CO2 sequestered in 10 years; that equals 285 kg. EcoMatcher uses an aeverage of 250 kg CO2 sequestered per tree.
