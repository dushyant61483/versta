// Virtual try-on service — currently simulates processing time and
// returns the user's own uploaded photo as a clearly-labeled mock result.
//
// TODO(CV team): Replace generateTryOn() with a real call to a virtual
// try-on model/API. Send { userPhoto, outfitId } and return a generated
// composite image URL instead of echoing the source photo back.

export async function generateTryOn({ userPhoto, outfit }) {
  if (!userPhoto || !outfit) {
    throw new Error('A photo and an outfit are required to generate a try-on.')
  }

  // Simulate model processing time for a convincing demo loading state.
  await new Promise((resolve) => setTimeout(resolve, 1800))

  return {
    resultImage: userPhoto,
    outfit,
    isMock: true,
  }
}
