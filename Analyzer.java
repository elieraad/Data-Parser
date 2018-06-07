public class Analyzer {

 double[][] matrixIn;
 int timesTrained = 0;

 public Analyzer(int in, int out) {
  matrixIn = new double[in][out];
 }

 public void train(int[] inputs, int[] outputs) {
  double weightIn = 1;
  double weightOut = 1;
  timesTrained++;
  for (int i = 0; i < inputs.length; i++) {
   if (i == inputs.length - 1)
    weightIn = 0.5;
   for (int j = 0; j < outputs.length; j++) {
    if (j == outputs.length - 1)
     weightOut = 0.5;
    matrixIn[inputs[i] - 1][outputs[j] - 1] = (matrixIn[inputs[i] - 1][outputs[j] - 1] + weightIn * weightOut)
      / timesTrained;
   }

  }
 }

 public void predict(int[] inputs) {
  double[] outputs = new double[42];
  for (int in = 0; in < inputs.length - 1; in++) {
   for (int i = 0; i < matrixIn[inputs[in] - 1].length; i++) {
    outputs[i] += matrixIn[inputs[in] - 1][i];
   }
  }
  for (int i = 0; i < outputs.length; i++) {
   System.out.println("Ball #" + (i + 1) + ": " + outputs[i]);
  }
 }

}
