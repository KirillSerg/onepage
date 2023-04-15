import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "./Header";
import { Title } from "./Users";
import FormPosition from "./FormPosition";
import successImg from "../img/success-image.svg"

import { GetUsers, IUsers } from "../types";

import styled from "styled-components";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const WrapperForm = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap:50px;
  margin-bottom: 100px;
`;

const CustomForm = styled.form`
  width: 380px;
  display: flex;
  flex-direction: column;
  align-items: center;

  && p {
    text-align: left;
    margin-bottom: 11px;
  }

  && span {
    color: red;
  }

  @media (max-width: 360px) {
    width: 328px;
  }
`;

const InputGroup = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 50px;
  margin-bottom: 25px;
`;

interface InputProps {
  readonly isError?: boolean;
}

const Input = styled.input<InputProps>`
  width: calc(100% - 16px - 2px);
  padding: 14px 0 14px 16px;
  background-color: #F8F8F8;
  border: 1px solid;
  border-color: ${props => props.isError ? "red" : "#D0CFCF"};
  border-radius: 4px;
`;

const PhoneLabel = styled.label`
  font-size: 12px;
  line-height: 14px;
  color: #7E7E7E;
`;

const UploadInput = styled.div`
  margin-bottom: 34px;
`;

const InputUpload = styled(Input)`
  width: calc((100% - 16px - 30px) * 0.7816);
  border-radius: 0;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
  color: #7E7E7E;
`;

const LabelUpload = styled.label`
  width: calc((100% - 16px - 30px) * 0.2184);
  padding: 14px 15px;
  background-color: #F8F8F8;
  border: 1px solid rgba(0, 0, 0, 0.87);
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
`;

// eslint-disable-next-line
const regExEmail = /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/

const schema = yup.object({
  name: yup.string().required().min(2, "min 2 symbol").max(60, "max 60 symbol"),
  email: yup
    .string()
    .required()
    .email()
    .min(2, "min 2 symbol")
    .max(100, "max 100 symbol")
    .matches(regExEmail, "need valid email"),
  phone: yup.string().required().matches(/^(\+380)([0-9]{9})$/, "should start with code of Ukraine +380"),
  position_id: yup.number().integer().required().min(1, "choose something"),
  photo: yup
    .mixed()
    .required("choose file") // dose not working for error ((
    .test("required", "required", (value) => {

        return !!value[0 as keyof typeof value]
    })
    .test("fileSize", "max size 5mb", (value) => {
      if (value[0 as keyof typeof value]) {
        return value && value[0 as keyof typeof value]["size" as keyof typeof value] <= 5000000
      } else return true
    })
    .test("type", "jpeg or jpg", (value) => {
      if (value[0 as keyof typeof value]) {
        // eslint-disable-next-line
        return value && value[0 as keyof typeof value]["type" as keyof typeof value] === "image/jpeg" ||
        value[0 as keyof typeof value]["type" as keyof typeof value] === "image/jpg"
      } else return true
    }),
}).required();

export type FormData = yup.InferType<typeof schema>

type FormProps = {
  setGetRespons: React.Dispatch<React.SetStateAction<GetUsers>>;
  setUsers: React.Dispatch<React.SetStateAction<IUsers[]>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
}

const Form: React.FC<FormProps> = ({ setGetRespons, setUsers, setIsLoading }) => {
  const [isPostRequestSuccesful, setIsPostRequestSuccesful] = useState<boolean>(false)

  const {register, handleSubmit, watch, formState: { errors, isValid }} = useForm<FormData>({
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const photoInfo = watch("photo", "Upload photo")

  const onSubmit = async (data: FormData) => {
    const responseToken = await fetch('https://frontend-test-assignment-api.abz.agency/api/v1/token')
    const resultToken = await responseToken.json()

    const formData = new FormData();
    formData.append('position_id', data.position_id.toString())
    formData.append('name', data.name)
    formData.append('email', data.email)
    formData.append('phone', data.phone)
    formData.append(
      'photo', data.photo[0 as keyof typeof data.photo],
      photoInfo[0 as keyof typeof photoInfo]["name" as keyof typeof photoInfo]
    )
    
    const responseUserPost = await fetch('https://frontend-test-assignment-api.abz.agency/api/v1/users', {
      method: "POST",
      body: formData,
      headers: {
        'Token': resultToken.token,
      },
    });

    const resultUserPost = await responseUserPost.json()

    if (responseUserPost.status === 200 || responseUserPost.status === 201) {
      setIsPostRequestSuccesful(true)
      setIsLoading(true)

      fetch('https://frontend-test-assignment-api.abz.agency/api/v1/users?page=1&count=6')
        .then((response) => response.json())
        .then((data: GetUsers) => {
          setIsLoading(false)

          if (data.success) {
            setGetRespons(data)
            setUsers(data.users.sort((a, b) => b.registration_timestamp - a.registration_timestamp))
          } else { console.log("Error") }
        })
    } else {alert(`Error: ${resultUserPost.message}`)}
  }

  return (
    <WrapperForm>
      <Title>
        {!isPostRequestSuccesful ? "Working with POST request" : "User successfully registered"}
      </Title>
      {isPostRequestSuccesful && <img src={successImg} alt="success upload"/>}
      {
        !isPostRequestSuccesful &&
        <CustomForm onSubmit={handleSubmit(onSubmit)}>
          <InputGroup>
            <div>
              <Input isError={!!errors?.name?.message} placeholder="Your name" type="text" {...register("name")} />
              <span>{errors?.name?.message || ""}</span>
            </div>
            
            <div>
              <Input isError={!!errors?.email?.message} placeholder="Email" type="email" {...register("email")} />
              <span>{errors?.email?.message || ""}</span>
            </div>
            
            <div>
              <Input isError={!!errors?.phone?.message} placeholder="Phone" type="tel" {...register("phone")} />
              <div>
                <PhoneLabel >+38 (XXX) XXX - XX - XX</PhoneLabel>
              </div>
              <span>{errors?.phone?.message || ""}</span>
            </div>
          </InputGroup>
            
          <FormPosition register={register}/>

          <UploadInput>
            <LabelUpload htmlFor="photo">Upload </LabelUpload>
            <InputUpload
              isError={!!errors?.photo?.message}
              disabled defaultValue={
                photoInfo[0 as keyof typeof photoInfo] &&
                photoInfo[0 as keyof typeof photoInfo]["name" as keyof typeof photoInfo]
              }
            />
            <span>{errors?.photo?.message || ""}</span>
            <input id="photo" style={{ opacity: "0" }} type="file" {...register("photo")} />
          </UploadInput>
          
          <Button disabled={!isValid} type="submit" value="Sing up">Sing up</Button>
        </CustomForm>
      }
    </WrapperForm>
  );
};

export default Form;