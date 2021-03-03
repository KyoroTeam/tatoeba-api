import * as cdk from "@aws-cdk/core";
import * as lambda from "@aws-cdk/aws-lambda";
import * as dynamodb from "@aws-cdk/aws-dynamodb";
import * as apiGateway from "@aws-cdk/aws-apigatewayv2";
import * as eb from "@aws-cdk/aws-elasticbeanstalk";

import * as path from "path";
import { TatoebaBeanstalkApp } from "./tatoeba-beanstalk-app";

export class Cdk2Stack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here
    const fn = new lambda.Function(this, "MyFunction", {
      runtime: lambda.Runtime.DOTNET_CORE_3_1,
      handler: "index.handler",
      code: lambda.Code.fromAsset(path.join(__dirname, "lambda-handler")),
    });

    const table = new dynamodb.Table(this, "Table", {
      partitionKey: { name: "id", type: dynamodb.AttributeType.NUMBER },
    });

    const app = new TatoebaBeanstalkApp(this, "tatoeba-app");

    table.grantReadWriteData(fn);
  }
}
