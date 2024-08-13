import { IJobOffer } from "@/types";
import { useState, useCallback } from "react";

export interface IAddNewJobSkill {
  type: "essentialSkill" | "niceToHave" | "techStack";
  item: string;
}

export const useJobSkillsState = (data: IJobOffer) => {
  const [essentialSkills, setEssentialSkills] = useState(
    data.requirements.essentialSkills,
  );
  const [niceToHaves, setNiceToHaves] = useState(data.requirements.niceToHaves);
  const [techStack, setTechStack] = useState(data.techStack);

  const addNewJobSkill = useCallback(({ type, item }: IAddNewJobSkill) => {
    switch (type) {
      case "essentialSkill":
        setEssentialSkills((prevSkills) => [...prevSkills, item]);
        break;
      case "niceToHave":
        setNiceToHaves((prevSkills) => [...prevSkills, item]);
        break;
      case "techStack":
        setTechStack((prevStack) => [...prevStack, item]);
        break;
      default:
        break;
    }
  }, []);

  return {
    essentialSkills,
    setEssentialSkills,
    niceToHaves,
    setNiceToHaves,
    techStack,
    setTechStack,
    addNewJobSkill,
  };
};
