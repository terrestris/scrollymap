export interface StepConfig {
    content: string; // Define the type of content according to your requirements, here 'any' represents any type
    center: [number, number]; // Assuming center is an array with two numbers
    zoom: number;
    baseLayer: Object;
    dataLayer: Object;
    topicLayer: Object;
    chart: Object;
    highlight: Object;
    attribution: string;
}

// Define a type for a list of such objects
export type StepConfigList = StepConfig[];

export type Config = {
    title: string;
    subTitle: string;
    steps: StepConfigList;
}
