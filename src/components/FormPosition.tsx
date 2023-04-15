import { useEffect, useState } from "react";
import { UseFormRegister } from "react-hook-form";
import styled from "styled-components";

import { FormData } from "./Form";
import { Typografy } from "./Card";

const PositionRadioGroup = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 7px;
  margin-bottom: 47px;

  & input[type="radio"] {
    margin-right: 12px;
    width: 20px;
    height: 20px;
  }
`;

const SingleRadioGroup = styled.div`
  display: flex;
  align-items: center;
`;

type FormPositionProps = {
  register: UseFormRegister<FormData>;
}

type Position = {
  id: number,
  name: string
}

interface GetPositions {
  success : boolean,
  positions : Position[]
}

const FormPosition = ({ register }: FormPositionProps) => {
  const [positions, setPositions] = useState<Position[]>([])

  useEffect(() => {
    fetch('https://frontend-test-assignment-api.abz.agency/api/v1/positions')
      .then((response) => response.json())
      .then((data: GetPositions) => {
        if (data.success) {
          setPositions(data.positions)
        } else { console.log("Error") }
      })
  }, [])

  return (
    <>
      <Typografy>Select your position</Typografy>
      <PositionRadioGroup>
        {positions.map(position => (
          <SingleRadioGroup key={position.id}>
            <input type="radio" value={position.id} {...register("position_id")} />
            <label>{position.name}</label>
        </SingleRadioGroup>
        ))}
      </PositionRadioGroup>
    </>
  );
};

export default FormPosition;