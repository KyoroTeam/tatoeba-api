import * as cdk from "@aws-cdk/core";
import * as lambda from "@aws-cdk/aws-lambda";
import * as path from "path";

export class Cdk2Stack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here
    const fn = new lambda.Function(this, "MyFunction", {
      runtime: lambda.Runtime.DOTNET_CORE_3_1,
      handler: "index.handler",
      code: lambda.Code.fromAsset(path.join(__dirname, "lambda-handler")),
    });
  }
}
